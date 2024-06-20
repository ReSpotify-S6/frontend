export interface Song {
    id: string;
    title: string;
    artist: string;
    imageLink: string;
    audioLink: string;
}

export interface CreateSongProps {
    title: string;
    artist: string;
    imageLink: string;
    audioLink: string;
}