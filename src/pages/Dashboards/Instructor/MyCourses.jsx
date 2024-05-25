import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import MyCoursesTableRow from "./MyCoursesTableRow";

const MyCourses = () => {
    const {user, loading} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const {data: courses=[], refetch} = useQuery({
        queryKey: ['rooms', user?.email],
        enabled: !loading,
        queryFn: async () => {
          const res = await axiosSecure.get(`/courses/${user?.email}`)
        //   console.log('res from axios', res.data)
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
                        courses.map((course, index) => <MyCoursesTableRow
                        key={course._id}
                        index = {index}
                        course={course}
                        ></MyCoursesTableRow>
                        )
                    }
                </tbody>
            </table>

        </div>
    );
};

export default MyCourses;