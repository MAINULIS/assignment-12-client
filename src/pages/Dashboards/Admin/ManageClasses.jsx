import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageClasses = () => {
    const [axiosSecure] = useAxiosSecure();

    const { refetch, data: courses = [] } = useQuery({
        queryFn: async () => {
            const res = await axiosSecure.get('/courses');
            return res.data;
        }
    })
    const handleApproved = course => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approved!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_BASE_URL}/courses/approved/${course._id}`, {
                    method: 'PATCH'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount) {
                            refetch();
                        }
                    })
                Swal.fire({
                    title: "Approved!",
                    text: `${course.name} course is approved `,
                    icon: "success"
                });
            }
        });

    }
    const handleDeny = course => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Deny!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_BASE_URL}/courses/deny/${course._id}`, {
                    method: 'PATCH'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount) {
                            refetch();
                        }
                    })
                Swal.fire({
                    title: "Denied!",
                    text: `${course.name} course is denied `,
                    icon: "success"
                });
            }
        });

    }


    return (
        <div className="w-full overflow-x-auto">

            <h3 className=" text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-800 mb-12 mt-7 text-center"> Our All Classes</h3>
            <table className="table">
                {/* head */}
                <thead className="text-white bg-cyan-600">
                    <tr className="uppercase">
                        <th></th>
                        <th>Name</th>
                        <th>Instructor</th>
                        <th>Email</th>
                        <th>Available Seats</th>
                        <th>Status</th>
                        <th>Action</th>
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
                                <button disabled={course.status === 'approved'}
                                    onClick={ () => handleApproved(course)}
                                    className="badge badge-outline bg-green-300 hover:bg-green-400 py-4 px-3 text-white font-bold relative disabled:opacity-60 disabled:cursor-not-allowed">Approved</button>
                            </td>
                            <td>
                                <button disabled={course.status === 'deny'}
                                    onClick={ () => handleDeny(course)}
                                    className="badge badge-outline  bg-red-300 hover:bg-red-400 p-4 text-white font-bold relative disabled:opacity-70
                             disabled:cursor-not-allowed">Deny</button>
                            </td>
                            <td>
                                <button
                                    className="badge badge-outline  bg-indigo-300 hover:bg-indigo-400 p-4 text-white font-bold relative disabled:opacity-60
                             disabled:cursor-not-allowed">Send Feedback</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>

        </div>
    );
};

export default ManageClasses;