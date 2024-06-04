import {LeftSide, RightSide} from "./ToolbarTemplates";
import LogoutButton from "../buttons/LogoutButton";
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SpotifyIcon from '../../../assets/SpotifyIcon';
import CustomButton from "../../../components/CustomButton";
import { useKeycloak } from "@react-keycloak/web";

export default function AdminToolbar() {
    const { keycloak } = useKeycloak();
    
    const logout = () => {
        keycloak.logout();
    };
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
            <LogoutButton onClick={logout}/>
        </RightSide>
    </>)
}