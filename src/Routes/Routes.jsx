import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../components/shared/ErrorPage";
import Login from "../pages/Access/Login";
import SignUp from "../pages/Access/SignUp";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element:<Home></Home>
            },
            {
                path:'login',
                element: <Login />
            },
            {
                path:'signup',
                element: <SignUp />
            }
        ]
    },
    
])