import Button from "@mui/material/Button";

interface DialogButtonProps {
    label: string;
    isDefault: boolean;
    sx?: object;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

export default function DialogButton(props: DialogButtonProps){
    const {label, isDefault, sx, onClick, type, ...params} = props;

    return (
        <Button
            sx={{
                flex: 1,
                border: 2,
                borderRadius: 4,
                borderColor: 'primary.dark',
                bgcolor: isDefault ? 'primary.dark' : 'transparent',
                color: isDefault ? 'text.primary' : 'text.secondary',
                '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'primary.main',
                    color: 'text.primary',
                },
                ...sx
            }}
            onClick={onClick}
            type={type}
            {...params}
        >
            {label}
        </Button>
    )
}