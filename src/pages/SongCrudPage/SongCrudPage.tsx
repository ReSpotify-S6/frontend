import {useEffect, useState} from "react";
import EnhancedTable from "../../components/EnhancedTable/EnhancedTable";
import DeleteEntityDialog from "../../components/Dialog/DeleteEntityDialog";
import { Box } from "@mui/material";
import { Song } from "../../services/song/types";
import { useKeycloak } from "@react-keycloak/web";
import SongService from "../../services/song/service";
import CreateSongDialog from "./CreateSongDialog";

export default function SongCrudPage() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [selectedSong, setSelectedSong] = useState<Song | undefined>(undefined);
    const [createDialogState, setCreateDialogState] = useState(false);
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


    function handleDelete() {
        selectedSong && service?.deleteSong(selectedSong.id);
    }

    function refresh() {
        service?.getAllSongs().then((array) => {
            setSongs(array);
        });
    }

    function format(value: unknown, dataLabel: string) {
        switch(dataLabel){
            case "audioLink":
                return <audio controls src={`${value}?token=${keycloak.token}`} style={{width: 200}}/>;
            case "imageLink":
                return <img src={`${value}?token=${keycloak.token}`} alt="Song" style={{width: 100, height: 100}}/>;
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
            <DeleteEntityDialog open={deleteDialogState}
                                entityName='song'
                                entityId={selectedSong?.title}
                                deleteFunction={handleDelete}
                                setOpen={setDeleteDialogState}
                                callback={refresh}
            />
        </>
    );
}