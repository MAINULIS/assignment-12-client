import { useEffect, useState } from "react";
import Container from "../../../components/shared/Container";
import { getAllCourses } from "../../../apis/courses";
import Loader from "../../../components/shared/Loader";
import CourseCard from "./CourseCard";

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllCourses()
            .then(data => {
                // const sortedData = data.sort((a, b) => b.enrolledStudents - a.enrolledStudents);
                const top6Courses = data.slice(0, 6)
                setCourses(top6Courses);
                setLoading(false);
            })
            .catch(error => console.log(error))
    }, [])
    
    if (loading) {
        return <Loader></Loader>
    }
    return (
        <Container>

            <p className="lg:text-5xl md:text-3xl text-2xl text-center font-thin text-neutral-800">Our Popular Courses</p>
            <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {
                    courses.map((course, index) =>
                        <CourseCard key={index} course={course}></CourseCard>
                    )
                }
            </div>
        </Container>
    );
};

export default Course;