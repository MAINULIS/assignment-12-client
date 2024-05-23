import { useEffect, useState } from "react";
import { getAllCourses } from "../../apis/courses";
import Loader from "../../components/shared/Loader";
import Container from "../../components/shared/Container";
import AllCourseCard from "./AllCourseCard";
import { Helmet } from "react-helmet-async";
const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllCourses()
            .then(data => {
                const filterCourse = data.filter(fd => fd.status === "approved")
                setCourses(filterCourse)
                setLoading(false);
            })
            .catch(error => console.log(error))
    }, [])
    // console.log(courses);
    if (loading) {
        return <Loader></Loader>
    }
    return (
        <div>
             <Helmet>
                <title>Language School | All Courses</title>
              </Helmet>
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
