import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import './CheckoutForm.css'
import { deleteSelectedCourse } from "../../../apis/courses";
// import { updateStudent } from "../../../apis/courses";

const CheckoutForm = ({ courseData }) => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");

    useEffect(() => {
        // generate client secret and save in state
        if (courseData?.price > 0) {
            axiosSecure.post('/create-payment-intent', { price: courseData?.price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, courseData])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        setProcessing(true)
        // confirm Payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'Unknown',
                    email: user?.email || 'Anonymous'
                },
            }
        })

        if (confirmError) {
            console.log('[error]', confirmError);
            setCardError(confirmError.message)
        } else {
            console.log('[paymentIntent]', paymentIntent);
        }

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id)
            // save payment info in db
            const paymentInfo = {
                ...courseData,
                transactionId: paymentIntent.id,
                date: new Date(),
            }
            axiosSecure.post('/enrolled-courses', paymentInfo)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        // delete the course from selected page
                        deleteSelectedCourse(courseData._id)
                            .then(data => {
                                console.log(data);
                                if (data.deletedCount > 0) {
                                    const text = `You Have Successfully Enrolled The Course! Your TransactionId: ${paymentInfo.transactionId}`
                                    toast.success(text, {
                                        style: {
                                            border: '1px solid #713200',
                                            padding: '16px',
                                            color: '#713200',
                                        }
                                    })
                                    navigate('/dashboard/payment-history');
                                    setProcessing(false)
                                }
                            })

                        // ToDo: update course info. student num will 1 less
                        // updateStudent(paymentInfo.courseId, paymentInfo.enrolledStudents, paymentInfo.availableSets)
                        //     .then(data => {
                        //         console.log(data);
                        //         const text = `You Have Successfully Enrolled The Course! Your TransactionId: ${transactionId}`
                        //         toast.success(text, {
                        //             style: {
                        //                 border: '1px solid #713200',
                        //                 padding: '16px',
                        //                 color: '#713200',
                        //             }
                        //         })
                        //         navigate('/dashboard/payment-history');
                        //         setProcessing(false)
                        //     })
                        //     .catch(error => {
                        //         console.log(error);
                        //         setProcessing(false)
                        //     })
                    }
                })
        }
    }
    return (

        <>
            <form className="w-2/3 mx-auto m-8" onSubmit={handleSubmit} >
                <CardElement className="shadow-lg p-3 hover:shadow-xl"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-block mt-12 bg-[#570DF8] text-white hover:bg-[#570DF8] font-bold " type="submit" disabled={!stripe || !clientSecret || processing || transactionId}>
                    {processing && !cardError ? <ImSpinner9 className="m-auto animate-spin text-orange-600" size={24}></ImSpinner9> : ` Pay ${courseData.price}$`}
                </button>
            </form>
            {
                cardError && <p className="text-red-600 mt-6 text-center text-xl">{cardError}</p>
            }
            {
                transactionId && <p className="text-green-600 mb-4 text-center text-xl">Transaction completed Successfully. Your TransactionId: {transactionId}</p>
            }
        </>
    );
};

export default CheckoutForm;