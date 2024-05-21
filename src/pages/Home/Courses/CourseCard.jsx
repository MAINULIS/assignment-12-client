import { Link } from "react-router-dom";

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
                        <div className="badge badge-secondary text-white font-semibold ">$ {course.price}</div>
                    </h2>
                    <div className="flex justify-between">
                        <h2 className="">
                            <span className="font-semibold text-neutral-500">Available seats:</span>
                            <span className="text-neutral-600 text-xl font-semibold"> {course.availableSets}</span>
                        </h2>
                        
                    </div>
                    <div className="card-actions flex justify-between mt-3">
                        <h2><span className="font-semibold text-neutral-500">Duration:</span> <span className="text-neutral-600 text-xl font-semibold">{course.duration}</span></h2>
                        <Link to="/all-courses">
                        <button className="inline-flex justify-center rounded-md border border-transparent bg-cyan-200 px-4 py-2 text-sm  font-semibold text-neutral-500 hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">Select Now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseCard;