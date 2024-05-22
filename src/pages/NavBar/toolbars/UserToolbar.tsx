import {LeftSide, RightSide} from "./ToolbarTemplates";
import LogoutButton from "../buttons/LogoutButton";
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SpotifyIcon from '../../../assets/SpotifyIcon';

export default function UserToolbar() {
    return (<>
        <LeftSide>
            <Link component={RouterLink} to='/'>
                <SpotifyIcon />
            </Link>
        </LeftSide>
        <RightSide>
            <LogoutButton/>
        </RightSide>
    </>);
}