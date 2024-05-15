
const CourseCard = ({ course }) => {
    return (
        <>
            <div className="card bg-white flex flex-col gap-2 w-full">
                <div className=" relative transition duration-200 transform rounded shadow-sm cursor-pointer ">
                    <img className="object-cover w-[424px] h-[320px] scale-95 " src={course.image} alt="course image" />
                    <div className='bg-black px-6 py-4 bg-opacity-60 opacity-0 hover:opacity-100  absolute inset-0 transition-opacity duration-200 flex flex-col justify-center items-center'> </div>
                </div>
                <div className="card-body  border border-t-0 -mt-5 ">
                    <h2 className="card-title md:text-2xl text-black">
                        {course.name}
                    </h2>
                    <div className="flex justify-between">
                        <h2 className="">
                            <span className="md:text-xl font-semibold text-neutral-700">Available sets:</span>
                            <span className="text-neutral-500"> {course.availableSets}</span>
                        </h2>
                        <div className="badge badge-secondary text-white font-semibold">$ {course.price}</div>
                    </div>
                    <div className="card-actions flex justify-between mt-3">
                        <h2><span className="md:text-xl font-semibold text-neutral-700">Duration:</span> <span className="text-neutral-500">{course.duration}</span></h2>
                        <div className="badge badge-outline bg-cyan-600 text-neutral-900 p-3 cursor-pointer">Enroll Now</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseCard;