import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const AllCourseCard = ({ course }) => {
    const {_id, name, image, instructorName, availableSets, price, duration,
        enrolledStudents } = course
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const HandleEnroll = () =>{
        if(user && user.email){
             <p>ff</p>
            //  post select course data here
        }
        else{
            navigate('/login', {state: {from:location}})
        }
    }
    return (
        <div className="card bg-white gap-2 flex w-full border rounded shadow-sm flex-col">
            <div>
                <img className="object-cover w-[424px] h-[320px]  " src={image} alt="course image" />
            </div>

            <div className={availableSets === 0 ? "card-body  border bg-red-400" : "card-body  border"}>
                    <div className="card-title md:text-2xl text-black mx-auto">
                        {name}
                    </div>
                    <div className="text-nowrap pt-3"><span className=" font-semibold text-neutral-500">Instructor: </span><span className="text-neutral-600 text-xl font-semibold">{instructorName}</span></div>

                    <div className="text-nowrap"><span className=" font-semibold text-neutral-500">Available seats:</span>
                    <span className="text-neutral-600 text-xl font-semibold "> {availableSets}</span></div>
                    <div><span className="font-semibold text-neutral-500">Duration:</span> <span className="text-neutral-600 text-xl font-semibold">{duration}</span></div>

                    <div className="badge badge-secondary mt-2 text-white font-semibold flex justify-end mx-auto"> <span>$ {price}</span></div>
                
                <div className="mt-5">
                    <button
                    onClick={() => HandleEnroll(course)}
                    // ToDo: btn also will be disabled if logged as admin or instructor
                    disabled={availableSets === 0 }
                     className="inline-flex justify-center rounded-md border border-transparent bg-cyan-200 px-4 py-2 text-sm font-semibold text-neutral-500 hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2  relative
                     disabled:opacity-70
                     disabled:cursor-not-allowed
                     p-4
                     hover:opacity-80
                     transition
                     w-full ">Select Class</button>
                </div>
            </div>
        </div>
    );
};

export default AllCourseCard;