import { Helmet } from "react-helmet-async";
import Carousel from "../Banner/Carousel";
import Course from "../Courses/Course";
import Instructor from "../Instructors/Instructor";
import Testimonial from "../Testimonials/Testimonial";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Language School | Home</title>
            </Helmet>
        <Carousel></Carousel>
        <Course></Course>
        <Instructor></Instructor>
       
        <Testimonial></Testimonial>
        </div>

    );
};

export default Home;