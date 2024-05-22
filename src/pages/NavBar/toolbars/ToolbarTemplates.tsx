import Box from "@mui/material/Box";

export function LeftSide(props: {children: React.ReactNode}) {
    return (
        <Box sx={{
            display: 'flex',
            flexGrow: 1,
            gap: 3,
            mr: 1.5
        }}>
            {props.children}
        </Box>
    );
}

export function RightSide(props: {children: React.ReactNode}) {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 3,
            mx: 1.5
        }}>
            {props.children}
        </Box>
    );
}