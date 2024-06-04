import {useEffect, useState} from "react";
import EnhancedTable from "./EnhancedTable/EnhancedTable";
import CreateSongDialog from "./Dialog/CreateSongDialog";
import UpdateSongDialog from "./Dialog/UpdateSongDialog";
import DeleteEntityDialog from "./Dialog/DeleteEntityDialog";
import { Box } from "@mui/material";
import { Song } from "../../services/types";
import { useKeycloak } from "@react-keycloak/web";
import SongService from "../../services/SongService";

export default function SongCrudPage() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [selectedSong, setSelectedSong] = useState<Song | undefined>(undefined);
    const [createDialogState, setCreateDialogState] = useState(false);
    const [updateDialogState, setUpdateDialogState] = useState(false);
    const [deleteDialogState, setDeleteDialogState] = useState(false);
    const [service, setService] = useState<SongService>();
    const { keycloak } = useKeycloak();


    useEffect(() => {
        if (keycloak.token) {
            const service = new SongService(keycloak.token);
            service.getAllSongs().then((array) => {
                setSongs(array);
            });
            setService(service);
        }
    }, [keycloak]);


    function handleDelete(id: string) {
        service?.deleteSong(id);
    }

    function refresh() {
        service?.getAllSongs().then((array) => {
            setSongs(array);
        });
    }

    function format(value: unknown, dataLabel: string) {
        switch(dataLabel){
            case "audioLink":
                return <audio controls src={value as string} style={{width: 200}}/>;
            case "imageLink":
                return <img src={value as string} alt="Song" style={{width: 100, height: 100}}/>;
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
                    entityName='song'
                    rows={songs}
                    excludeColumns={["id"]}
                    setCreateDialogState={setCreateDialogState}
                    setUpdateDialogState={setUpdateDialogState}
                    setDeleteDialogState={setDeleteDialogState}
                    setSelectedTarget={(song: object) => setSelectedSong(song as Song)}
                    format={format} 
                    compactViewEnabled={false}
                    rowsPerPageOptions={[3, 5, 10]}
                    title=""
                />
            </Box>
            <CreateSongDialog
                open={createDialogState}
                setOpen={setCreateDialogState}
                callback={refresh}
            />
            <UpdateSongDialog
                open={updateDialogState}
                setOpen={setUpdateDialogState}
                song={selectedSong}
                callback={refresh}
            />
            <DeleteEntityDialog open={deleteDialogState}
                                entityName='song'
                                entityId={selectedSong?.id}
                                deleteFunction={handleDelete}
                                setOpen={setDeleteDialogState}
                                callback={refresh}
            />
        </>
    );
}