import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DialogButton from "./DialogButton";
import SimpleDialog from "./SimpleDialog";
import * as React from "react";
import { createSong } from "../../../services/SongService";

interface CreateSongDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    callback?: () => void;
}

export default function CreateSongDialog(props: CreateSongDialogProps) {
    const {open, setOpen, callback} = props;
    const [errorMessage, setErrorMessage] = React.useState('');


    function handleCreate(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const title = data.get('title') as string;
        const artist = data.get('artist') as string;
        const imageLink = data.get('imageLink') as string;
        const audioLink = data.get('audioLink') as string;

        createSong({ title, artist, imageLink, audioLink })
            .then((response: string) => {
                if(!response){
                    callback?.();
                    handleClose();
                }
                else{
                    setErrorMessage(response);
                }
            });
    }

    function handleClose() {
        setErrorMessage('');
        setOpen(false);
    }

    return (
        <SimpleDialog title='Create a song' open={open}>
            <Box component="form" noValidate onSubmit={handleCreate}
                 sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     gap: 3,
                     width: 300,
                 }}>

                <TextField required id="title" label="Title" name='title' variant="outlined" />
                <TextField required id="artist" label="Artist" name='artist' variant="outlined" />
                <TextField required id="imageLink" label="Image Link" name='imageLink' variant="outlined" />
                <TextField required id="audioLink" label="Audio Link" name='audioLink' variant="outlined" />
                <Typography sx={{
                    color: 'red',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    margin: 0,
                }}>
                    {errorMessage}
                </Typography>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: 2}}>
                    <DialogButton type='submit' label='Create' isDefault/>
                    <DialogButton onClick={handleClose} label='Cancel' isDefault={false}/>
                </Box>
            </Box>
        </SimpleDialog>
    )
}