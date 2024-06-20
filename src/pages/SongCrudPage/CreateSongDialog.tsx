import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import SongService from "../../services/song/service";
import DialogButton from "../../components/Dialog/DialogButton";
import SimpleDialog from "../../components/Dialog/SimpleDialog";
import { MenuItem } from "@mui/material";
import AudioService from "../../services/audio/service";
import ImageService from "../../services/images/service";

interface CreateSongDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    callback?: () => void;
}

export default function CreateSongDialog(props: CreateSongDialogProps) {
    const { open, setOpen, callback } = props;
    const [errorMessage, setErrorMessage] = React.useState('');
    const [songService, setSongService] = React.useState<SongService>();

    const [audioLinks, setAudioLinks] = React.useState<string[]>([]);
    const [audioLink, setAudioLink] = React.useState<string>();

    const [imageLinks, setImageLinks] = React.useState<string[]>([]);
    const [imageLink, setImageLink] = React.useState<string>();

    const { keycloak } = useKeycloak();

    useEffect(() => {
        if (keycloak.token) {
            const songService = new SongService(keycloak.token);
            const audioService = new AudioService(keycloak.token);
            const imageService = new ImageService(keycloak.token);

            setSongService(songService);

            audioService.fetchAudioLinks().then((array) => {
                setAudioLinks(array);
            });

            imageService.fetchImageLinks().then((array) => {
                setImageLinks(array);
            });
            
        }
    }, [keycloak.token]);



    function handleCreate(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const title = data.get('title') as string;
        const artist = data.get('artist') as string;
        const imageLink = data.get('imageLink') as string;
        const audioLink = data.get('audioLink') as string;

        songService?.createSong({ title, artist, imageLink, audioLink })
            .then((response: string) => {
                if (!response) {
                    callback?.();
                    handleClose();
                }
                else {
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
                <TextField
                    id="imageLink"
                    value={imageLink}
                    select
                    onChange={(event) => setImageLink(event.target.value)}
                    label="Image"
                >
                    {imageLinks.map((link) => (
                        <MenuItem key={link} value={link}>
                            {decodeURIComponent(link.split('/').pop() as string)}
                            <img src={link} alt='image' style={{ width: 50, height: 50 }} />
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="audioLink"
                    value={audioLink}
                    select
                    onChange={(event) => setAudioLink(event.target.value)}
                    label="Audio"
                >
                    {audioLinks.map((link) => (
                        <MenuItem key={link} value={link}>
                            {decodeURIComponent(link.split('/').pop() as string)}
                        </MenuItem>
                    ))}
                </TextField>
                <Typography sx={{
                    color: 'red',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    margin: 0,
                }}>
                    {errorMessage}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <DialogButton type='submit' label='Create' isDefault />
                    <DialogButton onClick={handleClose} label='Cancel' isDefault={false} />
                </Box>
            </Box>
        </SimpleDialog>
    );
}
