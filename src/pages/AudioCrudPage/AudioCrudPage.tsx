import {useEffect, useState} from "react";
import EnhancedTable from "../../components/EnhancedTable/EnhancedTable";
import { Box } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import DeleteEntityDialog from "../../components/Dialog/DeleteEntityDialog";
import CreateAudioDialog from "./CreateAudioDialog";
import AudioService from "../../services/audio/service";

export default function AudioCrudPage() {
    const [audiolinks, setAudiolinks] = useState<string[]>([]);
    const [selectedAudioLink, setSelectedAudioLink] = useState<string>();
    const [createDialogState, setCreateDialogState] = useState(false);
    const [deleteDialogState, setDeleteDialogState] = useState(false);
    const [service, setService] = useState<AudioService>();
    const { keycloak } = useKeycloak();


    useEffect(() => {
        if (keycloak.token) {
            const service = new AudioService(keycloak.token);
            service.fetchAudioLinks().then((array) => {
                console.log(array);
                setAudiolinks(array);
            });
            setService(service);
        }
    }, [keycloak]);


    function handleDelete(id: string) {
        service?.deleteAudio(id);
    }

    function refresh() {
        service?.fetchAudioLinks().then((array) => {
            setAudiolinks(array);
        });
    }

    function format(value: unknown, dataLabel: string) {
        switch(dataLabel){
            case 'name':
                return decodeURIComponent(value as string);
            default:
                return value || "N/A";
        }
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                mb: "20%"
            }}>
                <EnhancedTable
                    entityName='audioLink'
                    rows={audiolinks.map((link) => ({name: decodeURIComponent(link.split('/').pop() as string), link }))}
                    excludeColumns={["id"]}
                    setCreateDialogState={setCreateDialogState}
                    setDeleteDialogState={setDeleteDialogState}
                    setSelectedTarget={(audioLink: object) => setSelectedAudioLink(audioLink as unknown as string)}
                    format={format} 
                    compactViewEnabled={false}
                    rowsPerPageOptions={[3, 5, 10]}
                    title=""
                />
            </Box>
            <CreateAudioDialog
                open={createDialogState}
                setOpen={setCreateDialogState}
                callback={refresh}
            />
            <DeleteEntityDialog open={deleteDialogState}
                                entityName='audioLink'
                                entityId={selectedAudioLink}
                                deleteFunction={handleDelete}
                                setOpen={setDeleteDialogState}
                                callback={refresh}
            />
        </>
    );
}