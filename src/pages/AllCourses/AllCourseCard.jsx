
const AllCourseCard = ({ course }) => {
    return (
        <div className="card bg-white flex flex-row gap-2 w-full border rounded shadow-sm">
            <div>
                <img className="object-cover w-[424px] h-[320px]  " src={course.image} alt="course image" />
            </div>

            <div className="card-body  border ">
                    <div className="card-title md:text-2xl text-black mx-auto">
                        {course.name}
                    </div>
                    <div className="text-nowrap pt-3"><span className=" font-semibold text-neutral-500">Instructor: </span><span className="text-neutral-600 text-xl font-semibold">{course.instructorName}</span></div>

                    <div className="text-nowrap"><span className=" font-semibold text-neutral-500">Available seats:</span>
                    <span className="text-neutral-600 text-xl font-semibold "> {course.availableSets}</span></div>
                    <div><span className="font-semibold text-neutral-500">Duration:</span> <span className="text-neutral-600 text-xl font-semibold">{course.duration}</span></div>

                    <div className="badge badge-secondary text-white font-semibold flex justify-end mx-auto"> <span>$ {course.price}</span></div>
                
                <div className="mt-5">
                    <button className="inline-flex justify-center rounded-md border border-transparent bg-cyan-200 px-4 py-2 text-sm font-medium text-neutral-500 hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">Enroll Now</button>
                </div>
            </div>
        </div>
    );
};

export default AllCourseCard;