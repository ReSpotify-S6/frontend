import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import DialogButton from "../../components/Dialog/DialogButton";
import SimpleDialog from "../../components/Dialog/SimpleDialog";
import SongService from "../../services/song/service";
import { Button } from "@mui/material";
import AudioService from "../../services/audio/service";

interface CreateSongDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    callback?: () => void;
}

export default function CreateAudioDialog(props: CreateSongDialogProps) {
    const { open, setOpen, callback } = props;

    const [fileName, setFileName] = React.useState<string>('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [service, setService] = React.useState<AudioService>();

    const { keycloak } = useKeycloak();

    useEffect(() => {
        if (keycloak.token) {
            setService(new AudioService(keycloak.token));
        }
    }, [keycloak.token]);


    function handleCreate(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get('name') as string;
        const file = data.get('file') as File;

        service?.uploadAudio(name, file)
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

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files) {
            const file = files[0];
            setFileName(file.name);
        }
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

                <TextField required id="name" label="Audio file name" name='name' variant="outlined" value={fileName} onChange={(e) => setFileName(e.target.value)}/>
                <Button
                    variant="contained"
                    component="label"
                    >
                    Upload Audio File
                    <input
                        name="file"
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
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
