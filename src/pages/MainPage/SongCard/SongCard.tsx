import { IconButton, Typography } from "@mui/material";
import "./styles.scss";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

interface SongCardProps {
    id: string;
    title: string;
    artist: string;
    imageSource?: string;
    onClick: (id: string) => void;
}

export default function SongCard(props: SongCardProps) {
    const { id, title, artist, imageSource, onClick } = props;

    return (
        <div className="song-card">
            {imageSource && <img src={imageSource} />}
            <div className="bottom">
                <div className="info">
                    <Typography fontWeight='bold' fontSize='large'>{title}</Typography>
                    <Typography>{artist}</Typography>
                </div>
                <IconButton className="play-button" onClick={() => onClick(id)}>
                    <PlayCircleIcon fontSize="large"/>
                </IconButton>
            </div>
        </div>
    )
}