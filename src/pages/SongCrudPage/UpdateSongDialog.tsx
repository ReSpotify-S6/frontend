import * as React from "react";
import SimpleDialog from "../../components/Dialog/SimpleDialog";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DialogButton from "../../components/Dialog/DialogButton";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import { Song } from "../../services/song/types";
import SongService from "../../services/song/service";

interface UpdateSongDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    callback?: () => void;
    song?: Song;
}

export default function UpdateSongDialog(props: UpdateSongDialogProps){
    const {open, setOpen, callback, song} = props;

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [service, setService] = useState<SongService>();

    const { keycloak } = useKeycloak();

    useEffect(() => {
        if (keycloak.token) {
            setService(new SongService(keycloak.token));
        }
    }, [keycloak.token]);

    function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const title = data.get('title') as string;
        const artist = data.get('artist') as string;
        const imageLink = data.get('imageLink') as string;
        const audioLink = data.get('audioLink') as string;

        service?.updateSong({ id: song?.id as string, title, artist, imageLink, audioLink })
            .then((errorMessage: string) => {
                if (errorMessage) {
                    setErrorMessage(errorMessage);
                } else {
                    setOpen(false);
                    callback?.();
                }
            });
    }

    function handleClose() {
        setErrorMessage('');
        setOpen(false);
    }

    return (
        <SimpleDialog title='Update a song' open={open}>
            <Box component="form" noValidate onSubmit={handleUpdate}
                 sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     gap: 3,
                     width: 300,
                 }}>

                <TextField required id="title" label="Title" name='title' variant="outlined" defaultValue={song?.title}/>
                <TextField required id="artist" label="Artist" name='artist' variant="outlined" defaultValue={song?.artist}/>
                <TextField required id="imageLink" label="Image Link" name='imageLink' variant="outlined" defaultValue={song?.imageLink}/>
                <TextField required id="audioLink" label="Audio Link" name='audioLink' variant="outlined" defaultValue={song?.audioLink}/>
                <Typography sx={{
                    color: 'red',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    margin: 0,
                }}>
                    {errorMessage}
                </Typography>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: 2}}>
                    <DialogButton type='submit' isDefault label='Update'/>
                    <DialogButton onClick={handleClose} label='Cancel' isDefault={false}/>
                </Box>
            </Box>
        </SimpleDialog>
    )
}