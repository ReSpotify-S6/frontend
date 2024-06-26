import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage.tsx";
import Root from "../pages/Root.tsx";
import MainPage from "../pages/MainPage/MainPage.tsx";
import SongCrudPage from "../pages/SongCrudPage/SongCrudPage.tsx";
import AudioCrudPage from "../pages/AudioCrudPage/AudioCrudPage.tsx";
import ImageCrudPage from "../pages/ImageCrudPage/ImageCrudPage.tsx";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <MainPage/>,
            },
            {
                path: "/songs",
                element: <SongCrudPage/>
            },
            {
                path: "/audio",
                element: <AudioCrudPage/>
            },
            {
                path: "/images",
                element: <ImageCrudPage/>
            }
        ]
    }
]);
export default Router;