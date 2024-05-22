import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
    const [axiosSecure] = useAxiosSecure();

    const {data: users = [] } = useQuery({
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    console.log(users);

    return (
        <div className="w-full overflow-x-auto">

        <h3 className=" text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-800 mb-12 mt-7 text-center"> Our All Users</h3>
        <table className="table">
            {/* head */}
            <thead className="text-white bg-cyan-600">
                <tr className="uppercase">
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {
                    users.map((user, index) => <tr key={user._id}>
                        <th> {index + 1}</th>

                        <td>
                            <div className="font-semibold text-neutral-700">{user.name}</div>

                        </td>
                        <td>
                            <span className="font-semibold text-neutral-700">{user.email}</span>
                        </td>
                        <td>
                            <span className={user?.role === 'admin' ?"font-semibold text-cyan-600"  :"font-semibold text-neutral-700"}>{user.role}</span>
                        </td>
                        <td>
                         <button
                          className="badge badge-outline bg-green-300 hover:bg-green-400 py-4 px-3 text-white font-bold  ">Make Instructor</button>
                        </td>
                        <td>
                         <button
                          className="badge badge-outline  bg-red-300 hover:bg-red-400 p-4 text-white font-bold ">Make Admin</button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>

    </div>
    );
};

export default ManageUsers;