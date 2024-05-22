import {useEffect, useState} from "react";
import EnhancedTable from "./EnhancedTable/EnhancedTable";
import CreateSongDialog from "./Dialog/CreateSongDialog";
import UpdateSongDialog from "./Dialog/UpdateSongDialog";
import DeleteEntityDialog from "./Dialog/DeleteEntityDialog";
import { Box } from "@mui/material";
import { Song } from "../../services/Song";
import { deleteSong, getAllSongs } from "../../services/SongService";

export default function SongCrudPage(){

    const [songs, setSongs] = useState<Song[]>([]);
    const [selectedSong, setSelectedSong] = useState<Song | undefined>(undefined);
    const [createDialogState, setCreateDialogState] = useState(false);
    const [updateDialogState, setUpdateDialogState] = useState(false);
    const [deleteDialogState, setDeleteDialogState] = useState(false);


    useEffect(() => {
        refresh();
    }, []);

    function handleDelete(id: string) {
        deleteSong(id);
    }

    function refresh() {
        getAllSongs().then((array) => {
            setSongs(array);
        });
    }

    function format(value: unknown, dataLabel: string) {
        switch(dataLabel){
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
                    setCreateDialogState={setCreateDialogState}
                    setUpdateDialogState={setUpdateDialogState}
                    setDeleteDialogState={setDeleteDialogState}
                    setSelectedTarget={(song: object) => setSelectedSong(song as Song)}
                    format={format}
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