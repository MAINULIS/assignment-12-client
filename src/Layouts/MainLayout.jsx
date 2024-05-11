import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";
import Footer from "../components/shared/Footer"

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-24 min-h-[calc(100vh-60px)]">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;