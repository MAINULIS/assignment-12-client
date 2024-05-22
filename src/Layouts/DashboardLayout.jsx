import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboards/Sidebar";
import { Helmet } from "react-helmet-async";

const DashboardLayout = () => {
    return (
        <div className='relative min-h-screen md:flex'>
           <Helmet>
                <title>Language School | Dashboard</title>
              </Helmet>
        <Sidebar />
        <div className='flex-1  md:ml-24'>
          <div className='p-5'>
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default DashboardLayout;