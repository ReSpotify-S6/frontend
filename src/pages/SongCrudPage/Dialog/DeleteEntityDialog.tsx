import DialogButton from "./DialogButton";
import SimpleDialog from "./SimpleDialog";

interface DeleteEntityDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    entityName: string;
    entityId?: string;
    deleteFunction: (id: string) => void;
    callback?: () => void;
}

export default function DeleteEntityDialog(props: DeleteEntityDialogProps) {
    const {open, setOpen, entityName, entityId, deleteFunction, callback} = props;

    function handleDelete(){
        entityId && deleteFunction(entityId);
        callback?.();
        setOpen(false);
    }
    function handleClose(){
        setOpen(false);
    }

    const title = 'Are you sure want to delete ' + (entityName?.toLowerCase() || 'entity') + ' with id \'' + entityId + '\' ?';

    return (
        <SimpleDialog title={title} open={open}>
            <DialogButton onClick={handleDelete} label='Yes' isDefault={true}/>
            <DialogButton onClick={handleClose} label='No' isDefault={false}/>
        </SimpleDialog>
    );
}
