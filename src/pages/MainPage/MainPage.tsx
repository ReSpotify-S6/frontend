import { IconButton, Slider } from '@mui/material';
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

export default function App() {
    const [progress, setProgress] = useState(0);
    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
        getAllSongs().then((songs) => {
            setSongs(songs);
        });
    }, []);

    return (
        <>
            <div className="main">
                {songs.map((song) => (
                    <SongCard
                        key={song.id}
                        title={song.title}
                        artist={song.artist}
                        imageSource={song.imageLink}
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
                    <IconButton size="large" >
                        <PlayCircleIcon fontSize='large'/> 
                    </IconButton>
                    <IconButton>
                        <SkipNextIcon />
                    </IconButton>
                    <IconButton>
                        <RepeatIcon />
                    </IconButton>
                </div>
                <div className="progress">
                    <Slider 
                        value={progress} 
                        className='bar'
                        onChange={(_, value) => setProgress(value as number)}
                    />
                </div>
            </div>
        </>
    )
}