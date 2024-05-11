import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-24 min-h-[calc(100vh-60px)]">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayout;