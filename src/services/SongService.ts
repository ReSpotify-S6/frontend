import api from "../config/axios";
import { Song } from "./Song";

export async function getAllSongs(): Promise<Array<Song>> {
    return api.get('/songs').then((response) => {
        return response.data;
    }).catch((error) => {
        console.error(error);
        return [];
    });
}

interface CreateSongProps {
    title: string;
    artist: string;
    imageLink: string;
    audioLink: string;
}

export async function createSong(props: CreateSongProps): Promise<string> {
    const { title, artist, imageLink, audioLink } = props;
    
    return api.post('/songs', {
        title,
        artist,
        imageLink,
        audioLink
    }).then(() => {
        return '';
    }).catch(() => {
        return "Unhandled error has occured.";
    });
}


interface UpdateSongProps {
    id: string;
    title: string;
    artist: string;
    imageLink: string;
    audioLink: string;
}

export async function updateSong(props: UpdateSongProps): Promise<string> {
    const { id, title, artist, imageLink, audioLink } = props;

    return api.put(`/songs/${id}`, {
        title,
        artist,
        imageLink,
        audioLink
    }).then(() => {
        return '';
    }).catch(() => {
        return "Unhandled error has occured.";
    });
}

export async function deleteSong(id: string): Promise<string> {
    return api.delete(`/songs/${id}`)
    .then(() => {
        return '';
    }).catch((error) => {
        return error;
    });
}