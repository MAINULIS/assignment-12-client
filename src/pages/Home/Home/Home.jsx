import { Helmet } from "react-helmet-async";
import Carousel from "../Banner/Carousel";
import Course from "../Courses/Course";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Language School | Home</title>
            </Helmet>
        <Carousel></Carousel>
        <Course></Course>
        </div>

    );
};

export default Home;