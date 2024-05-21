import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { getEnrollCourse } from "../../../apis/courses";
import { Link } from "react-router-dom";
import Loader from "../../../components/shared/Loader";

const EnrolledClasses = () => {
    const { user, } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    useEffect(() => {
        setLoading(true);
        getEnrollCourse(user?.email)
            .then(data => {
                setEnrolledCourses(data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
        

    }, [user])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {
                enrolledCourses && Array.isArray(enrolledCourses) && enrolledCourses.length > 0 ?
                    (
                        <div className="w-full overflow-x-auto">

                            <h3 className=" text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-800 mb-12 mt-7 text-center">Your Enrolled Courses</h3>
                            <table className="table">
                                {/* head */}
                                <thead className="text-white bg-cyan-600">
                                    <tr className="uppercase">
                                        <th></th>
                                        <th>Course Name</th>
                                        <th>Instructor</th>
                                        <th>Duration</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        enrolledCourses.map((enroll, index) => <tr key={enroll._id}>
                                            <th> {index + 1}</th>

                                            <td>
                                                <div className="font-semibold text-neutral-700">{enroll.name}</div>

                                            </td>
                                            <td>
                                                <span className="font-semibold text-neutral-700">{enroll.instructorName}</span>
                                            </td>
                                            <td>
                                                <span className="font-semibold text-neutral-700"> {enroll?.duration}</span>
                                            </td>
                                            <td>
                                                <Link to=''>
                                                    <button className="bg-cyan-200 px-4 py-2 font-semibold text-neutral-500 hover:bg-cyan-300 focus:outline-none rounded-full ">Watch Now</button>
                                                </Link>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>

                        </div>
                    ) :
                    (
                        <div className='h-screen gap-5 flex flex-col justify-center items-center'>
                            <p className='text-gray-600 text-xl lg:text-3xl mt-10'>Sorry! So Far No Enroll Course For You !</p>
                            <Link to='/dashboard/selected-courses'>
                                <button className="bg-cyan-200 px-4 py-2 font-semibold text-neutral-500 hover:bg-cyan-300 focus:outline-none rounded-sm ">Enroll Now</button>
                            </Link>
                        </div>
                    )
            }
        </>
    );
};

export default EnrolledClasses;