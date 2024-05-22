import { useEffect, useState } from "react";
import { getInstructors } from "../../apis/instructors";
import Loader from "../../components/shared/Loader";
import Container from "../../components/shared/Container";
import { Helmet } from "react-helmet-async";

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getInstructors()
            .then(data => {
                setInstructors(data)
                setLoading(false);
            })
            .catch(error => console.log(error))
    }, [])
    
    if(loading) {
        return <Loader></Loader>
    }
    return (
        <div className="w-full overflow-x-auto">
             <Helmet>
                <title>Language School | Instructors</title>
              </Helmet>
            <Container>
                <h3  className=" text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-950 mb-12">Our All Renowned Instructors</h3>
            <table className="table">
                    {/* head */}
                    <thead className="text-white bg-cyan-600">
                        <tr className="uppercase">
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            instructors.map((instructor, index) => <tr key={instructor._id}>
                                <th> {index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-4">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={instructor.image} alt="avatar image" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{instructor.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {instructor.email}
                                    <br />
                                </td>
                                <td>
                                    <button  className="badge badge-outline bg-lime-300 text-neutral-700 p-3 font-semibold text-nowrap">See Classes</button>
                                </td>
                                
                            </tr>)
                        }
                    </tbody>
                </table>
            </Container>
        </div>
    );
};

export default Instructors;