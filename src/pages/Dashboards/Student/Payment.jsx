import { useLoaderData } from "react-router-dom";
import CheckoutForm from "../../../components/Dashboard/Forms/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PK}`)

const Payment = () => {
    const courseData = useLoaderData();
    console.log(courseData);
    return (
        <div className="w-full mt-12 flex  flex-col justify-center items-center ">
            <div className="card w-2/3 bg-neutral-100 text-neutral-content pb-6">
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-neutral-800">{courseData.name}</h2>
                    <p><span className="font-semibold text-neutral-500">Instructor:</span> <span className="text-neutral-600 text-xl font-semibold">{courseData.instructorName}</span></p>
                    <div className="card-actions justify-end">
                        <div className="rounded py-2 px-3 shadow-sm bg-cyan-100"><span className="font-semibold text-neutral-500">Course Fee: </span> <span className="text-neutral-600 text-xl font-semibold">$ {courseData.price}</span></div>
                    </div>
                </div>
                <Elements stripe={stripePromise}>
                <CheckoutForm courseData={courseData}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;