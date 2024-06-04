import LogoutIcon from "@mui/icons-material/Logout";
// import {Link} from "react-router-dom";
import CustomButton from "../../../components/CustomButton";

interface LogoutButtonProps {
    onClick: () => void;
}

const LogoutButton = (props: LogoutButtonProps) => {
    const {onClick} = props;

    return (
        <CustomButton
            onClick={onClick}
            // component={Link}
            invertColors
            // to='/'
        >
            <LogoutIcon/>Log out
        </CustomButton>
    )
}
export default LogoutButton;