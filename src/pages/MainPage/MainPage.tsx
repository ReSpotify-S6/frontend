import { IconButton, Slider, Typography } from '@mui/material';
import './styles.scss';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import { useEffect, useState } from 'react';
import SongCard from './SongCard/SongCard';
import { Song } from '../../services/song/types';
import { PauseCircle, PlayCircle } from '@mui/icons-material';
import { useKeycloak } from '@react-keycloak/web';
import SongService from '../../services/song/service';

export default function App() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [track, setTrack] = useState<HTMLAudioElement | undefined>(undefined);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const { keycloak } = useKeycloak();

    useEffect(() => {
        if (keycloak.token) {
            const service = new SongService(keycloak.token);
            service.getAllSongs().then((songs) => {
                setSongs(songs);
            });
        }
    }, [keycloak, keycloak.token]);

    useEffect(() => {
        if (!track) return;
        track.addEventListener('loadedmetadata', () => {

        });

        track.addEventListener('timeupdate', () => {
            setCurrentTime(track.currentTime);
            setProgress(track.currentTime / track.duration * 100);
        });

        return () => {
            track.removeEventListener('loadedmetadata', () => {});
            track.removeEventListener('timeupdate', () => {});
        };
  }, [track]);

    function handleSongSelect(id: string) {
        const song = songs.find((song) => song.id === id);
        if (!song) {
            return;
        }

        if (track) {
            track.pause();
        }

        const newTrack = new Audio(`${song.audioLink}?token=${keycloak.token}`);
        newTrack.play();
        setTrack(newTrack);
        setPlaying(true);
    }

    function handlePlay() {
        if (!track) {
            return;
        }

        if (playing) {
            track.pause();
        } else {
            track.play();
        }

        setPlaying(!playing);
    }

    function handleSeek(event: any) {
        if (!track) {
            return;
        }

        track.currentTime = (event.target.value / 100) * track.duration;
    }

    function formatTime(seconds: number | undefined) {
        if (!seconds) {
            return "--:--";
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <>
            <div className="main">
                {songs.map((song) => (
                    <SongCard
                        key={song.id}
                        id={song.id}
                        title={song.title}
                        artist={song.artist}
                        imageSource={`${song.imageLink}?token=${keycloak.token}`}
                        onClick={handleSongSelect}
                    />
                ))}
            </div>
            <div className="playbar">
                <div className="controls">
                    <IconButton>
                        <ShuffleIcon />
                    </IconButton>
                    <IconButton>
                        <SkipPreviousIcon />
                    </IconButton>
                    <IconButton size="large" onClick={handlePlay} >
                        {playing
                        ? <PauseCircle fontSize='large'/>
                        : <PlayCircle fontSize='large'/>}
                    </IconButton>
                    <IconButton>
                        <SkipNextIcon />
                    </IconButton>
                    <IconButton>
                        <RepeatIcon />
                    </IconButton>
                </div>
                <div className="progress">
                    <Typography>
                        {formatTime(currentTime)}
                    </Typography>
                    <Slider
                        value={progress} 
                        className='bar'
                        onChange={handleSeek}
                    />
                    <Typography>
                        {formatTime(track?.duration)}
                    </Typography>
                </div>
            </div>
        </>
    )
}
