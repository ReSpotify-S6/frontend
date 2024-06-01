import { IconButton, Slider, Typography } from '@mui/material';
import './styles.scss';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import { useEffect, useState } from 'react';
import SongCard from './SongCard/SongCard';
import { getAllSongs } from '../../services/SongService';
import { Song } from '../../services/Song';
import { PauseCircle, PlayCircle } from '@mui/icons-material';

export default function App() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [track, setTrack] = useState<HTMLAudioElement | undefined>(undefined);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        getAllSongs().then((songs) => {
            setSongs(songs);
        });
    }, []);

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

        const newTrack = new Audio(song.audioLink);
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
                        imageSource={song.imageLink}
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