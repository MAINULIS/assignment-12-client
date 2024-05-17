import { Link, useRouteError } from "react-router-dom";
import Lottie from "lottie-react";
import Container from "./Container";
import errorImg from '../../assets/animation/404-animation.json'


const ErrorPage = () => {
    const {error} = useRouteError();
    return (
        <section className='flex items-center justify-center h-screen p-16 bg-gray-100'>
            <Container>
            <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
               
               <Lottie className="md:w-72" animationData={errorImg} loop={true}></Lottie>
                   <p className="text-2xl font-semibold text-lime-950 md:font-bold md:text-3xl">We Are Sorry, Page Not Found</p>
                   <p className='lg:text-2xl font-semibold text-red-800 mb-8 mt-2'>
                       {error?.message}
                   </p>
                   <Link to='/' className='btn hover:bg-lime-800 bg-lime-900 text-white'>
                       Back To Homepage
                   </Link>
               
           </div>
            </Container>
        </section>
    );
};

export default ErrorPage;