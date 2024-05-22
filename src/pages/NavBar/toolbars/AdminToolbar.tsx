import {LeftSide, RightSide} from "./ToolbarTemplates";
import LogoutButton from "../buttons/LogoutButton";
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SpotifyIcon from '../../../assets/SpotifyIcon';
import CustomButton from "../../../components/CustomButton";

export default function AdminToolbar() {
    return (<>
        <LeftSide>
            <Link component={RouterLink} to='/'>
                <SpotifyIcon />
            </Link>
            <CustomButton link="/admin" invertColors>
                Admin page
            </CustomButton>
        </LeftSide>
        <RightSide>
            <LogoutButton/>
        </RightSide>
    </>)
}