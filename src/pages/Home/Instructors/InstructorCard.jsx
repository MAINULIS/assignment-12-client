import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { ImFacebook } from "react-icons/im";

const InstructorCard = ({ instructor }) => {
    return (
        <>
            <div className="card bg-neutral-50 flex flex-col gap-2 w-full border">
                <div className=" relative transition duration-200 transform rounded cursor-pointer lg:m-10 md:m-5 md:mx-auto mx-auto mt-5">

                    <img className="object-cover w-[220px] h-[220px]  lg:w-[320px] lg:h-[320px] md:w-[155px] md:h-[155px] rounded-full overflow-hidden shadow-sm" src={instructor.image} alt="course image" />
                    <div className='bg-black px-6 py-4 bg-opacity-60 opacity-0 hover:opacity-100  absolute inset-0 transition-opacity duration-200 flex flex-col justify-center items-center rounded-full md:font-bold font-semibold text-3xl md:text-4xl text-white'> + </div>
                </div>
                <div className="card-body px-2 md:-mt-12 -mt-5">
                    <div className="grid items-center">
                        <h2 className="card-title md:text-2xl text-black mx-auto">
                            {instructor.name}
                        </h2>
                        <p className="md:text-xl font-semibold text-neutral-700">{instructor.teach}</p>
                    </div>
                    <div className="card-actions grid mt-3">
                        <p className="text-neutral-500">{instructor.description}</p>
                        <div className="flex justify-center mt-3 gap-4 ">
                            <span className="hover:text-cyan-600 cursor-pointer duration-100 transition "><FaLinkedinIn /></span>
                            <span className="hover:text-cyan-600 cursor-pointer duration-100 transition "><ImFacebook /></span>
                            <span className="hover:text-cyan-600 cursor-pointer duration-100 transition "><FaTwitter /></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InstructorCard;