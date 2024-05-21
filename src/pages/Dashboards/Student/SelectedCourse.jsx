import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
// import { getSelectedCourse } from "../../../apis/courses";
import { Link } from "react-router-dom";
import TableRow from "../TableRow";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SelectedCourse = () => {
    const {user} = useContext(AuthContext);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [axiosSecure] = useAxiosSecure();

    const fetchSelectedCourses = () => {
        // getSelectedCourse(user?.email) 
        // .then(data => {
        //     setSelectedCourses(data);
        // })
        // .catch(error => console.log(error))
        axiosSecure.get(`/selected?email=${user?.email}`)
        .then(res => {
            setSelectedCourses(res.data)
        })
        .catch(error => console.log(error))
    }

    useEffect( () => {
        fetchSelectedCourses()
    } ,[user])


    return (
      <>
      {
        selectedCourses && Array.isArray(selectedCourses) && selectedCourses.length > 0 ?
        (
            <div className="w-full overflow-x-auto">
           
            <h3  className=" text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-800 mb-12 mt-7 text-center">Your Selected Courses</h3>
        <table className="table">
                {/* head */}
                <thead className="text-white bg-cyan-600">
                    <tr className="uppercase">
                        <th></th>
                        <th>Name</th>
                        <th>Instructor</th>
                        <th>Price</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                 {
                    selectedCourses.map((selectedCourse, index) => (
                        <TableRow 
                        index={index}
                        key={selectedCourse._id} 
                        selectedCourse={selectedCourse}
                        fetchSelectedCourses={fetchSelectedCourses}
                        ></TableRow>
                    ) )
                 }
                </tbody>
            </table>
       
    </div>
        ) :
        (
            <div className='h-screen gap-5 flex flex-col justify-center items-center'>
            <p className='text-gray-600 text-xl lg:text-3xl mt-10'>So far no course selected!</p>
            <Link to='/all-courses'>
                <button className="bg-cyan-200 px-4 py-2 font-semibold text-neutral-500 hover:bg-cyan-300 focus:outline-none rounded-sm ">Get Courses</button>
            </Link>
        </div>
        )
      }
      </>
    );
};

export default SelectedCourse;