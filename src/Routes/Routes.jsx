import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../components/shared/ErrorPage";
import Login from "../pages/Access/Login";
import SignUp from "../pages/Access/SignUp";
import Instructors from "../pages/Instructors/Instructors";
import AllCourses from "../pages/AllCourses/AllCourses";
import DashboardLayout from "../Layouts/DashboardLayout";
import SelectedCourse from "../pages/Dashboards/Student/SelectedCourse";
import PrivateRoute from "./PrivateRoute";
import EnrolledClasses from "../pages/Dashboards/Student/EnrolledClasses";
import Payment from "../pages/Dashboards/Student/Payment";
import { singleCourse } from "../apis/courses";

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
                path:'instructors',
                element: <Instructors></Instructors>
            },
            {
                path: 'all-courses',
                element:<AllCourses></AllCourses> 
            }
        ]
    },
    {
        path:'login',
        element: <Login />
    },
    {
        path:'signup',
        element: <SignUp />
    },
    {
        path: 'dashboard',
        element:<PrivateRoute>  <DashboardLayout /> </PrivateRoute>,
        children: [
            {
                path:'/dashboard/selected-courses',
                element: <SelectedCourse />
            },
            {
                path:'/dashboard/enrolled-courses',
                element: <EnrolledClasses />
            },
            {
                path:'/dashboard/payment/:id',
                element: <Payment />,
                loader: ({params}) => singleCourse(params.id)
            }
        ]
    }
    
])