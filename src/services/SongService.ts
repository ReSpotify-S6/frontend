import axios, { AxiosInstance } from "axios";
import { CreateSongProps, Song, UpdateSongProps } from "./types";

export default class SongService {
    private api: AxiosInstance;

    constructor(token: string) {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL,
            timeout: 5000,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Allow-Control-Allow-Origin': '*'
            }
        });
    }

    getAllSongs = async (): Promise<Array<Song>> => {
        return this.api.get('/songs').then((response) => {
            return response.data;
        }).catch((error) => {
            console.error(error);
            return [];
        });
    }
    
    createSong = async (props: CreateSongProps): Promise<string> => {
        const { title, artist, imageLink, audioLink } = props;
        
        return this.api.post('/songs', {
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


    updateSong = async (props: UpdateSongProps): Promise<string> => {
        const { id, title, artist, imageLink, audioLink } = props;

        return this.api.put(`/songs/${id}`, {
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

    deleteSong = async (id: string): Promise<string> => {
        return this.api.delete(`/songs/${id}`)
        .then(() => {
            return '';
        }).catch((error) => {
            return error;
        });
    }
}