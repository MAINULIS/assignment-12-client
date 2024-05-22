import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaBook, FaClipboardList, FaCog, FaHistory, FaHome } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { GrLogout } from 'react-icons/gr';
import { HiHome } from 'react-icons/hi2';
const Sidebar = () => {
  const { logOut, role } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogOut = () => {
    logOut()
    navigate('/')
  }
  return (
    <div className="flex">
      <div onClick={toggleSidebar} className={`fixed z-30 inset-y-0 left-0 w-64 bg-gray-900 text-gray-100 p-5 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="text-2xl font-bold mb-5 ">{role === "student" && 'Student'} {role === "admin" && 'Admin'} {role === 'instructor' && 'Instructor'} Dashboard</div>
        <nav className="flex flex-col justify-between h-full py-5">
          {
            role === 'student' &&
            <div >
              <ul>
                <li className="mb-4">
                  <NavLink to="/dashboard/selected-courses" activeClassName="bg-gray-700" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                    <FaBook />
                    <span>My Selected Courses</span>
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink to="/dashboard/enrolled-courses" activeClassName="bg-gray-700" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                    <FaClipboardList />
                    <span>My Enrolled Courses</span>
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink to="/dashboard/payment-history" activeClassName="bg-gray-700" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                    <FaHistory />
                    <span>Payment History</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          }
          {
            role === "admin" &&
            <div >
              <ul>
                <li className="mb-4">
                  <NavLink to="/dashboard" activeClassName="bg-gray-700" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                    <HiHome />
                    <span>Home</span>
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink to="/dashboard/manage-classes" activeClassName="bg-gray-700" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                    <FaBook />
                    <span>Manage Classes</span>
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink to="/dashboard/manage-users" activeClassName="bg-gray-700" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                    <FaClipboardList />
                    <span>Manage Users</span>
                  </NavLink>
                </li>

              </ul>
            </div>
          }
          <div>
            <hr />
            <ul className='mt-3'>
              <li className="mb-4 ">
                <NavLink to="/" activeClassName="bg-gray-700" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                  <FaHome />
                  <span>User Home</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="mb-4">
                <Link to="/settings" activeClassName="bg-gray-700" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                  <FaCog />
                  <span>Settings</span>
                </Link>
              </li>
              <li className="mb-4">
                <Link onClick={handleLogOut} activeClassName="bg-gray-700" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                  <GrLogout />
                  <span>Log Out</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="flex-1 md:ml-64">
        <div className="flex justify-between items-center p-5 bg-gray-800 text-gray-100 md:hidden">
          <button onClick={toggleSidebar} className="text-2xl">
            <FaBars />
          </button>
          <div className="text-2xl font-bold">Admin</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;