import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { TbLoader3 } from "react-icons/tb";
const img_token = import.meta.env.VITE_IMG_KEY;

const AddClass = () => {
    const { user, loading, setLoading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { register,
        handleSubmit,
        formState: { errors },
        reset } = useForm();
    const img_url = `https://api.imgbb.com/1/upload?key=${img_token}`;

    const onSubmit = data => {
        const name = data.name;
        const email = user?.email;
        const instructorName = user?.displayName;
        const duration = data.duration;
        const availableSeats = data.availableSeats;
        const price = data.price;

        // image upload
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        fetch(img_url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imgRes => {
                if (imgRes.success) {
                    const imgURL = imgRes.data.display_url;

                    const newCourse = { name, email, image: imgURL, price: parseFloat(price), availableSeats, instructorName, enrolledStudents: 0, duration, status: "pending" }
                    console.log(newCourse);
                    axiosSecure.post('/courses', newCourse)
                    .then(data => {
                        if(data.data.insertedId){
                            reset();
                            setLoading(false);
                            toast.success(`Your ${name} course is successfully upload. please wait for Admin approve`, {
                                style: {
                                    border: '1px solid #713200',
                                    padding: '16px',
                                    color: '#713200',
                                }
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        setLoading(false)
                    })

                }
            })
    }

    return (
        <div className="w-full  mt-10 ">
            <h3 className=" text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-800 mb-12 mt-7 text-center">Add A New Course</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-neutral-100 lg:px-14 lg:py-10 items-center text-cyan-600 p-4 shadow-sm" action="">
                <div className="md:flex justify-between md:gap-2 lg:gap-4">
                    <label className="form-control lg:w-1/2">
                        <div className="label">
                            <span className="label-text font-semibold text-black text-xl">Course Name*</span>
                        </div>
                        <input {...register("name", { required: true })} type="text" placeholder="Course " className="input input-bordered w-full bg-white" />
                        {errors.name && <span className="text-warning"> Name is required</span>}
                    </label>
                    <label className="form-control lg:w-1/2">
                        <div className="label">
                            <span className="label-text font-semibold text-black text-xl">Course Duration*</span>
                        </div>
                        <input {...register("duration", { required: true })} type="text" placeholder="duration " className="input input-bordered w-full bg-white" />
                        {errors.duration && <span className="text-warning"> duration is required</span>}
                    </label>



                </div>
                <div className="md:flex justify-between gap-4">
                    <label className="form-control lg:w-1/2">
                        <div className="label">
                            <span className="label-text font-semibold text-black text-xl">Instructor Name</span>
                        </div>
                        <input {...register("instructor")} type="text" placeholder={`${user?.displayName}`} className="input input-bordered w-full bg-white " readOnly />
                    </label>

                    <label className="form-control lg:w-1/2">
                        <div className="label">
                            <span className="label-text font-semibold text-black text-xl">Email</span>
                        </div>
                        <input type="text" placeholder={`${user?.email} `} {...register("email")}
                            className="input input-bordered w-full bg-white" readOnly />
                    </label>
                </div>
                <div className="md:flex justify-between gap-4">
                    <label className="form-control lg:w-1/2">
                        <div className="label">
                            <span className="label-text font-semibold text-black text-xl">Available Seats*</span>
                        </div>
                        <input {...register("availableSeats", { required: true })} type="number" placeholder="availableSeats" className="input input-bordered w-full bg-white" />
                        {errors.availableSeats && <span className="text-warning"> Available Seats is required</span>}
                    </label>
                    <label className="form-control lg:w-1/2">
                        <div className="label">
                            <span className="label-text font-semibold text-black text-xl">Price*</span>
                        </div>
                        <input {...register("price", { required: true })} type="number" placeholder="price" className="input input-bordered w-full bg-white" />
                        {errors.price && <span className="text-warning"> Price is required</span>}
                    </label>
                </div>
                <label className="form-control lg:w-1/2">
                    <div className="label">
                        <span className="label-text font-semibold text-black text-xl">Select Img*</span>
                    </div>
                    <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered bg-white w-full max-w-xs" />
                    {errors.image && <span className="text-warning"> image is required</span>}
                </label>

                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent transition duration-200 bg-neutral-400 px-4 py-2 text-xl font-bold text-white hover:bg-neutral-500 focus:outline-none cursor-pointer btn btn-block mt-7">
                        {loading ? <TbLoader3 className="m-auto animate-spin text-orange-600" size={24}/> : 'Add Course'}
                </button>

            </form>
        </div>
    );
};

export default AddClass;