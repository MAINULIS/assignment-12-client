import { useEffect, useState } from "react";
import { getAllCourses } from "../../apis/courses";
import Loader from "../../components/shared/Loader";
import Container from "../../components/shared/Container";
import AllCourseCard from "./AllCourseCard";
const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllCourses()
            .then(data => {
                setCourses(data)
                setLoading(false);
            })
            .catch(error => console.log(error))
    }, [])
    console.log(courses);
    if (loading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <Container>
                <h3 className=" text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-950 mb-12">Our All Language Courses</h3>
                <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {
                courses.map((course, index) => (
                    <AllCourseCard key={index} course={course}>
                    </AllCourseCard>
                ))
            }
                </div>
            </Container>
        </div>
    );
};

export default AllCourses;
