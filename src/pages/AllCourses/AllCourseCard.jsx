import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AllCourseCard = ({ course }) => {
    const { _id, name, image, instructorName, availableSeats, price, duration,
        enrolledStudents } = course
    const { user, role } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [insertedId, setInsertedId] = useState(null)

    const handleSelect = (course) => {
        
        if (user && user.email) {
            const selectedCourse = { courseId: _id, name, image, price,availableSeats, enrolledStudents, instructorName, email: user?.email, duration }
            fetch(`${import.meta.env.VITE_BASE_URL}/selected`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(selectedCourse)
            })
            .then(res => res.json())
            .then(data => {
                setInsertedId(data.insertedId)
                if(data.insertedId){
                 toast.success( `${name} Course is added to your cart as selected Course.` ,{
                    style: {
                      border: '1px solid #713200',
                      padding: '16px',
                      color: '#713200',
                    }
                  })
                }
            })
        }
        else {
            navigate('/login', { state: { from: location } })
        }
    }
    return (
        <div className="card bg-white gap-2 flex w-full border rounded shadow-sm flex-col">
            <div>
                <img className="object-cover w-full h-[320px]  " src={image} alt="course image" />
            </div>

            <div className={availableSeats === 0 ? "card-body  border bg-red-400" : "card-body  border"}>
                <div className="card-title md:text-2xl text-black mx-auto">
                    {name}
                    <div className="badge badge-secondary mt-2 text-white font-semibold flex justify-end mx-auto"> <span>$ {price}</span></div>
                </div>
                <div className="text-nowrap pt-3"><span className=" font-semibold text-neutral-500">Instructor: </span><span className="text-neutral-600 text-xl font-semibold">{instructorName}</span></div>

                <div className="text-nowrap"><span className=" font-semibold text-neutral-500">Available seats:</span>
                    <span className="text-neutral-600 text-xl font-semibold "> {availableSeats}</span></div>
                <div><span className="font-semibold text-neutral-500">Duration:</span> <span className="text-neutral-600 text-xl font-semibold">{duration}</span></div>

                
                <p ><span className="font-semibold text-neutral-500">EnrolledStudents:</span> <span className="text-neutral-600 text-xl font-semibold">{enrolledStudents}</span></p>
                <div className="mt-5">
                    <button
                        onClick={() => handleSelect(course)}
                        disabled={availableSeats === 0 || insertedId || role === "admin" || role === "instructor"}
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