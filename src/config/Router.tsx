import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage.tsx";
import Root from "../pages/Root.tsx";
import MainPage from "../pages/MainPage/MainPage.tsx";
import SongCrudPage from "../pages/SongCrudPage/SongCrudPage.tsx";

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
                path: "/admin",
                element: <SongCrudPage/>
            }
        ]
    }
]);
export default Router;