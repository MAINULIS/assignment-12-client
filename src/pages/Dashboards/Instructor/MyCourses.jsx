import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const MyCourses = () => {
    const {user, loading} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const {data: courses=[], refetch} = useQuery({
        queryKey: ['rooms', user?.email],
        enabled: !loading,
        queryFn: async () => {
          const res = await axiosSecure.get(`/courses/${user?.email}`)
          console.log('res from axios', res.data)
          return res.data;
        }
      })

    return (
        <div className="w-full overflow-x-auto">

            <h3 className=" text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-800 mb-12 mt-7 text-center"> Your Released All Courses</h3>
            <table className="table">
                {/* head */}
                <thead className="text-white bg-cyan-600">
                    <tr className="uppercase">
                        <th></th>
                        <th>Name</th>
                        <th>Available Seats</th>
                        <th>Enrolled Students</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Feedback</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        courses.map((course, index) => <tr key={course._id}>
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
                                <span className= "font-semibold text-neutral-700" >{course?.status}</span>
                                </td>
                            }
                            {
                                course.status === 'deny' && <td>
                                    <span className="font-semibold text-red-600" >{course?.status}</span>
                                </td>
                            }
                            {
                                course.status === 'approved' && <td>
                                    <span className= "font-semibold text-green-600" >{course?.status}</span>
                                </td>
                            }
                
                            <td>
                                <button 
                                    className="badge badge-outline bg-green-300 hover:bg-green-400 py-4 px-3 text-white font-bold relative disabled:opacity-60 disabled:cursor-not-allowed">Update</button>
                            </td>
                            <td>
                                <button
                                    className="badge badge-outline  bg-indigo-300 hover:bg-indigo-400 p-4 text-white font-bold relative disabled:opacity-60
                             disabled:cursor-not-allowed">See Feedback</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>

        </div>
    );
};

export default MyCourses;