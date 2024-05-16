import { useEffect, useState } from "react";
import Container from "../../../components/shared/Container";
import { getInstructors } from "../../../apis/instructors";
import Loader from "../../../components/shared/Loader";
import InstructorCard from "./InstructorCard";

const Instructor = () => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getInstructors()
            .then(data => {
                const sortedData = data.sort((a, b) => b.students - a.students);
                const top6Instructors = sortedData.slice(0, 6)
                setInstructors(top6Instructors);
                setLoading(false);
            })
            .catch(error => console.log(error))
    }, [])
    console.log(instructors);
    if (loading) {
        return <Loader></Loader>
    }
    return (
        <Container>
            <p className="lg:text-5xl md:text-3xl text-2xl text-center font-thin text-neutral-800">Our Popular Instructors</p>
            <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {
                    instructors.map(( instructor, index,) => 
                        <InstructorCard key={index} instructor={instructor}></InstructorCard>
                    )
                }
            </div>
        </Container>
    );
};

export default Instructor;