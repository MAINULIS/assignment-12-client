import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

const Card = ({img, heading, position}) => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <div className=" relative w-full">
                        <img src={img} className="w-full   lg:h-[800px]" />
                        <div className= {position ? `absolute flex items-center bg-gradient-to-l w-full from-[#151515c0] to-[rgba(21, 21, 21, 0.00)] top-0 bottom-0 ${position}`: 'absolute flex items-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)] top-0 bottom-0'}  >
                            <div className='space-y-6 md:w-1/3 md:ml-12 lg:ml-24 ml-4'>
                                <p className='text-2xl md:text-4xl lg:text-5xl text-white font-semibold'>
                                    {heading}
                                </p>
                                <div className='flex gap-5 uppercase'>
                                    <Link to={user ? "/" : "/signup"} className="btn btn-sm text-white hover:bg-cyan-700 bg-cyan-600">Sign up now</Link>
                                    <button className="btn btn-sm btn-outline text-white ">learn more</button>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    );
};

export default Card;