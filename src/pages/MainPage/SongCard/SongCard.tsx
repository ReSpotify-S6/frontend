import { IconButton, Typography } from "@mui/material";
import "./styles.scss";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

interface SongCardProps {
    title: string;
    artist: string;
    imageSource?: string;
}

export default function SongCard(props: SongCardProps) {
    const { title, artist, imageSource } = props;

    return (
        <div className="song-card">
            {imageSource && <img src={imageSource} />}
            <div className="bottom">
                <div className="info">
                    <Typography fontWeight='bold' fontSize='large'>{title}</Typography>
                    <Typography>{artist}</Typography>
                </div>
                <IconButton className="play-button">
                    <PlayCircleIcon fontSize="large"/>
                </IconButton>
            </div>
        </div>
    )
}