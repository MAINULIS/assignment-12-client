import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import ManageTableRow from "./ManageTableRow";

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

            <h3 className=" text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-800 mb-12 mt-7 text-center"> Our All Courses</h3>
            <table className="table">
                {/* head */}
                <thead className="text-white bg-cyan-600">
                    <tr className="uppercase">
                        <th></th>
                        <th>Name</th>
                        <th>Instructor</th>
                        <th>Email</th>
                        <th>Available Seats</th>
                        <th>duration</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Action</th>
                        <th>Feedback</th>
                    </tr>
                </thead>

                <tbody>
                    {
                      courses &&  courses.map((course, index) => (
                        <ManageTableRow
                        key={course._id}
                        index={index}
                        course={course}
                        handleApproved={handleApproved}
                        handleDeny={handleDeny}
                        ></ManageTableRow>
                      )
                      )    
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageClasses;