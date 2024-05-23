import { useState } from "react";
import FeedbackModal from "./FeedbackModal";

const ManageTableRow = ({ index, course, handleApproved, handleDeny }) => {
    let [isOpen, setIsOpen] = useState(false);

    function closeModal (){
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
                    <span className="font-semibold text-neutral-700">{course.instructorName}</span>
                </td>
                <td>
                    <span className="font-semibold text-neutral-700">{course?.email}</span>
                </td>
                <td>
                    <span className="font-semibold text-neutral-700">{course?.availableSeats}</span>
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
                    <button disabled={course.status === 'approved'}
                        onClick={() => handleApproved(course)}
                        className="badge badge-outline bg-green-300 hover:bg-green-400 py-4 px-3 text-white font-bold relative disabled:opacity-60 disabled:cursor-not-allowed">Approved</button>
                </td>
                <td>
                    <button disabled={course.status === 'deny'}
                        onClick={() => handleDeny(course)}
                        className="badge badge-outline  bg-red-300 hover:bg-red-400 p-4 text-white font-bold relative disabled:opacity-70
                             disabled:cursor-not-allowed">Deny</button>
                </td>
                <td>
                    <button onClick={() => setIsOpen(true)}
                        className="badge badge-outline  bg-indigo-300 hover:bg-indigo-400 p-4 text-white font-bold relative disabled:opacity-60
                             disabled:cursor-not-allowed">Send Feedback</button>
                        
                        <FeedbackModal
                        isOpen={isOpen}
                        closeModal={closeModal}
                        modalHandler={modalHandler}
                        course ={course}
                        ></FeedbackModal>
                </td>
            </tr>
        </>
    );
}

export default ManageTableRow;