import * as React from "react";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";


interface CustomButtonProps {
    children: React.ReactNode;
    link?: string;
    invertColors?: boolean;
    sx?: object;
    loading?: boolean;
    toggling?: boolean;
    onClick?: () => void;
    otherProps?: object;
}

export default function CustomButton(props: CustomButtonProps) {
    const {children, link, invertColors, sx, loading, toggling, onClick, ...otherProps} = props;

    const [active, setActive] = useState(false);
    const location = useLocation();

    const bgcolor = invertColors ? 'primary.main' : 'background.paper';
    const color = invertColors ? 'background.paper' : 'primary.main';

    function handleClick() {
        if(toggling === true) {
            setActive(!active);
        }
        onClick?.();
    }

    useEffect(() => {
        if (link) {
            setActive(location.pathname === link);
        }
    }, [location, link]);

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1
        }}>
            <LoadingButton
                onClick={handleClick}
                loading={loading}
                component={link && Link}
                to={link}
                sx={{
                    color: active ? color : bgcolor,
                    bgcolor: active ? bgcolor : color,
                    whiteSpace: 'nowrap',
                    border: 2,
                    borderColor: bgcolor,
                    borderRadius: 3,
                    boxShadow: 3,
                    gap: 1,
                    ':hover': {
                        color: active ? color : toggling ? bgcolor : color,
                        bgcolor: active ? bgcolor : toggling ? color : bgcolor,
                        borderColor: bgcolor //toggling ? bgcolor : active ? color : bgcolor,
                    },
                    ...sx
                }}
                {...otherProps}
            >
                {Array.isArray(children) ? children.map((child, index) => (
                    <Box key={index} sx={{
                        display: 'flex',
                    }}>
                        {child}
                    </Box>
                )) : children}
            </LoadingButton>
        </Box>
    )
}