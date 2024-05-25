import { useContext, useState } from "react";
import SeeFeedback from "./SeeFeedback";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const MyCoursesTableRow = ({ index, course, }) => {
    let [isOpen, setIsOpen] = useState(false);

    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { data: feedbacks = [] } = useQuery({
        queryKey: ['feedback', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/feedback/${user?.email}`)
            // console.log('res email fed',res.data);
            return res.data;
        }
    })
    
   

  

    function closeModal() {
        setIsOpen(false)
    }

    const modalHandler = (id) => {
        
    }


    return (
        <>
            <tr>

                <th> {index + 1}</th>

                <td>
                    <div className="flex items-center gap-4">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={course.image} alt="avatar image" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{course.name}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <span className="font-semibold text-neutral-700">{course?.availableSeats}</span>
                </td>
                <td>
                    <span className="font-semibold text-neutral-700">{course?.enrolledStudents}</span>
                </td>
                {
                    course.status === 'pending' && <td>
                        <span className="font-semibold text-neutral-700" >{course?.status}</span>
                    </td>
                }
                {
                    course.status === 'deny' && <td>
                        <span className="font-semibold text-red-600" >{course?.status}</span>
                    </td>
                }
                {
                    course.status === 'approved' && <td>
                        <span className="font-semibold text-green-600" >{course?.status}</span>
                    </td>
                }

                <td>
                    <button
                        className="badge badge-outline bg-green-300 hover:bg-green-400 py-4 px-3 text-white font-bold relative disabled:opacity-60 disabled:cursor-not-allowed">Update</button>
                </td>
                <td>
                <div onClick={() => modalHandler(course._id)}>
                    <button  onClick={() => setIsOpen(true,course._id)}
                        className="badge badge-outline  bg-indigo-300 hover:bg-indigo-400 p-4 text-white font-bold relative disabled:opacity-60
                             disabled:cursor-not-allowed">See Feedback</button> </div>

                    
                        <SeeFeedback
                        feedbacks= {feedbacks}
                            isOpen={isOpen}
                            closeModal={closeModal}
                            modalHandler={modalHandler}
                            course={course}
                        ></SeeFeedback>
                    

                </td>
            </tr>
        </>
    );
};

export default MyCoursesTableRow;