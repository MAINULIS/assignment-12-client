import { FaTrash } from "react-icons/fa";
import { deleteSelectedCourse } from "../../apis/courses";
import toast from "react-hot-toast";

const TableRow = ({ index, selectedCourse, fetchSelectedCourses}) => {
    const handleDelete = (id) => {
        deleteSelectedCourse(id)
        .then(data => {
            console.log(data);
            if(data.deletedCount > 0){
                fetchSelectedCourses();
                toast.success('The Selected Course Deleted')
            }
        })
    }
    return (
        <tr>
            <th> {index + 1}</th>
            <td>
                <div className="flex items-center gap-4">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={selectedCourse?.image} alt="avatar image" />
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold text-neutral-700">{selectedCourse.name}</div>
                    </div>
                </div>
            </td>
            <td>
                <span className="font-semibold text-neutral-700">{selectedCourse.instructorName}</span>
            </td>
            <td>
                <span className="font-semibold text-neutral-700">$ {selectedCourse.price}</span>
            </td>
            <td>
                <button onClick={ () => handleDelete(selectedCourse._id)} data-te-toggle="tooltip" title="Delete"> <FaTrash  className="w-5 h-5 hover:scale-110 hover:text-red-500 text-red-400"/> </button>
            </td>
            <td>
                <button className="badge badge-outline  bg-green-400 hover:bg-green-500 p-4 text-white font-bold"> Pay </button>
            </td>
        </tr>
    );
};

export default TableRow;