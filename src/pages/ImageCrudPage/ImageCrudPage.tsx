import {useEffect, useState} from "react";
import EnhancedTable from "../../components/EnhancedTable/EnhancedTable";
import { Box } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import DeleteEntityDialog from "../../components/Dialog/DeleteEntityDialog";
import CreateImageDialog from "./CreateImageDialog";
import ImageService from "../../services/images/service";
import './styles.scss';

export default function ImageCrudPage() {
    const [imagelinks, setImagelinks] = useState<string[]>([]);
    const [selectedImageLink, setSelectedImageLink] = useState<string>();
    const [createDialogState, setCreateDialogState] = useState(false);
    const [deleteDialogState, setDeleteDialogState] = useState(false);
    const [service, setService] = useState<ImageService>();
    const { keycloak } = useKeycloak();


    useEffect(() => {
        if (keycloak.token) {
            const service = new ImageService(keycloak.token);
            service.fetchImageLinks().then((array) => {
                setImagelinks(array || []);
            });
            setService(service);
        }
    }, [keycloak]);


    function handleDelete() {
        selectedImageLink && service?.deleteImage(selectedImageLink);
    }

    function refresh() {
        service?.fetchImageLinks().then((array) => {
            setImagelinks(array);
        });
    }

    function format(value: unknown, dataLabel: string) {
        switch(dataLabel){
            case 'name':
                return decodeURIComponent(value as string);
            case 'image':
                return <img src={`${value}?token=${keycloak.token}`} alt={value as string} />;
            default:
                return value || "N/A";
        }
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                mb: "20%"
            }}>
                <EnhancedTable
                    entityName='image'
                    rows={imagelinks?.map((link) => ({name: decodeURIComponent(link.split('/').pop() as string), image: link }))}
                    excludeColumns={["id"]}
                    setCreateDialogState={setCreateDialogState}
                    setDeleteDialogState={setDeleteDialogState}
                    setSelectedTarget={(obj: {name: string, image: string}) => setSelectedImageLink(obj.image)}
                    format={format} 
                    compactViewEnabled={false}
                    rowsPerPageOptions={[3, 5, 10]}
                    title=""
                />
            </Box>
            <CreateImageDialog
                open={createDialogState}
                setOpen={setCreateDialogState}
                callback={refresh}
            />
            <DeleteEntityDialog open={deleteDialogState}
                                entityName='image'
                                entityId={decodeURIComponent(selectedImageLink?.split('/').pop() as string)}
                                deleteFunction={handleDelete}
                                setOpen={setDeleteDialogState}
                                callback={refresh}
            />
        </>
    );
}