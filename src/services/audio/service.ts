import axios, { AxiosInstance } from "axios";

export default class AudioService {
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

    fetchAudioLinks = async (): Promise<string[]> => {
        return this.api.get('/audio').then((response) => {
            return response.data;
        }).catch(() => {
            return [];
        });
    }
    
    uploadAudio = async (name: string, file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', file);
        console.log(formData);
        return this.api.post('/audio', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            return '';
        }).catch(({response}) => {
            return response.data[0];
        });
    }

    deleteAudio = async (link: string): Promise<void> => {
        return this.api.delete(link)
        .then(() => {
            return '';
        }).catch((error) => {
            return error;
        });
    }
}