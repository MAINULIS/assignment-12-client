import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { getEnrollCourse } from "../../../apis/courses";
import { Link } from "react-router-dom";
import Loader from "../../../components/shared/Loader";

const PaymentHistory = () => {
    const { user, } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [histories, setHistories] = useState([]);
    useEffect(() => {
        setLoading(true);
        getEnrollCourse(user?.email)
            .then(data => {
                const sortedPaymentHistory =data.sort((a, b) => new Date(b.date) - new Date(a.date))
                setHistories(sortedPaymentHistory)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })


    }, [user])

    if(loading) {
        return <Loader />
    }

    return (
        <>
            {
                histories && Array.isArray(histories) && histories.length > 0 ?
                    (
                        <div className="w-full overflow-x-auto">

                            <h3 className=" text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-800 mb-12 mt-7 text-center">Your Payment Histories</h3>
                            <table className="table">
                                {/* head */}
                                <thead className="text-white bg-cyan-600">
                                    <tr className="uppercase">
                                        <th></th>
                                        <th>Course Name</th>
                                        <th>Course Id</th>
                                        <th>Transaction Id</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        histories.map((history, index) => <tr key={history._id}>
                                            <th> {index + 1}</th>

                                            <td>
                                                <div className="font-semibold text-neutral-700">{history.name}</div>

                                            </td>
                                            <td>
                                                <span className="font-semibold text-neutral-700">{history.courseId}</span>
                                            </td>
                                            <td>
                                                <span className="font-semibold text-neutral-700"> {history?.transactionId}</span>
                                            </td>
                                            <td>
                                                <span className="font-semibold text-neutral-700"> {history?.date}</span>
                                            </td>
                                            
                                        </tr>)
                                    }
                                </tbody>
                            </table>

                        </div>
                    ) :
                    (
                        <div className='h-screen gap-5 flex flex-col justify-center items-center'>
                            <p className='text-gray-600 text-xl lg:text-3xl mt-10'>Sorry! You Haven&apos;t Any Payment History!</p>
                            <Link to='/dashboard/selected-courses'>
                                <button className="bg-cyan-200 px-4 py-2 font-semibold text-neutral-500 hover:bg-cyan-300 focus:outline-none rounded-sm ">Enroll Now</button>
                            </Link>
                        </div>
                    )
            }
        </>
    );
};

export default PaymentHistory;