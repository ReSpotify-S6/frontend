import LogoutIcon from "@mui/icons-material/Logout";
import {Link} from "react-router-dom";
import CustomButton from "../../../components/CustomButton";

const LogoutButton = () => {
    return(
        <CustomButton
            onClick={() => {}}
            component={Link}
            invertColors
            to='/'
        >
            <LogoutIcon/>Log out
        </CustomButton>
    )
}
export default LogoutButton;