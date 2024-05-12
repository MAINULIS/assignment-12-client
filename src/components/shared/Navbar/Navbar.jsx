import { Link } from "react-router-dom";
import logo from '../../../assets/images/icon.ico'
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import avatarImg from '../../../assets/images/placeholder.jpg'
import { HiMiniBars3 } from "react-icons/hi2";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const navOptions = <>
        <li className="hover:bg-neutral-400 py-1 px-2 rounded transition"><Link to="/">HOME</Link></li>
        <li className="hover:bg-neutral-400 py-1 px-2 rounded transition"><Link to="/">instructors</Link></li>
        <li className="hover:bg-neutral-400 py-1 px-2 rounded transition"><Link to="/">classes</Link></li>
    </>

    return (
        <div className="navbar bg-black fixed z-10 bg-opacity-30 w-full text-white shadow-sm border-b-[1px]">
            <div className="navbar-start ">
                <div className="dropdown uppercase ">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-semibold ">
                        {navOptions}
                    </ul>
                </div>
                <div className="font-semibold flex gap-3 justify-center items-center">
                    <Link to="/">
                        <div className='hidden md:block'>
                            <img className="rounded-full" src={logo} alt="logo" width={100} height={100} />
                        </div>
                    </Link>
                    <div className="md:text-xl font-semibold">
                        <Link className="font-serif">FOREIGN LANGUAGE</Link>
                        <p className="font-mono">Learning School</p>
                    </div>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex font-semibold uppercase ">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end font-semibold">
                {
                    user ? <>
                        
                        <div className="dropdown dropdown-end pr-2">
                            <div tabIndex={0} role="button" className="m-1 "><HiMiniBars3 size={24}/></div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-neutral-300 rounded-box w-52">
                            <Link className="hover:bg-neutral-400 py-2 px-3 rounded transition text-green-900 uppercase" to="/">Dashboard</Link>
                            <Link onClick={() => { logOut() }} className="hover:bg-neutral-400 py-2 px-3 rounded transition font-semibold text-xl pr-4 text-green-900" to="/login">LogOut</Link>
                            </ul>
                        </div>
                        <div className="pr-4">
                            <img className='rounded-full cursor-pointer'
                                referrerPolicy='no-referer'
                                src={user && user.photoURL ? user.photoURL : avatarImg}
                                data-te-toggle="tooltip"
                                title={`This is ${user?.displayName}`}
                                alt="profile"
                                height={50}
                                width={50} />
                        </div>
                        
                    </> :
                        <Link className="hover:bg-neutral-400 py-2 px-3 rounded transition font-bold text-xl pr-4 text-green-900" to="/login">Login</Link>
                }
            </div>

        </div>

    );
};

export default Navbar;