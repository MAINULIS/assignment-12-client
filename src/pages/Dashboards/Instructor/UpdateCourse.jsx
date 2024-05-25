import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { TbLoader3 } from "react-icons/tb";
import Swal from "sweetalert2";
const img_token = import.meta.env.VITE_IMG_KEY;

const UpdateCourse = () => {
    const { id } = useParams()
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const img_url = `https://api.imgbb.com/1/upload?key=${img_token}`;

    const { data: course = [] } = useQuery({
        queryKey: ['course', id],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/courses-id/${id}`)
            console.log('res from id', res.data)
            return res.data;
        }
    })

    const {_id, name, instructorName, duration, availableSeats, price } = course;

    const handleUpdateCourse = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const duration = form.duration.value;
        const instructorName = form.instructorName.value;
        const email = form.email.value;
        const availableSeats = form.availableSeats.value;
        const price = form.price.value;

        const image = event.target.image.files[0];
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
                    console.log(imgURL);
                    const updatedCourse = { name, duration, instructorName, email, availableSeats, price, imgURL};
                    console.log(updatedCourse);
                    fetch(`${import.meta.env.VITE_BASE_URL}/courses/${_id}`, {
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body:JSON.stringify(updatedCourse)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data.acknowledged === true){
                            Swal.fire({
                                title: 'Success!',
                                color: "#716add",
                                text:`the ${name} language course successfully updated`,
                                icon: 'success',
                                confirmButtonText: 'Keep Rocking'
                              })
                            form.reset();
                        }
                    })
                }
            })
    }



    return (
        <div className='lg:m-24 md:m-24 p-4 bg-neutral-100 shadow-sm'>

            <h3 className=" text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-800 mb-12 mt-7 text-center">{`Update ${name} language course`}</h3>

            <form onSubmit={handleUpdateCourse} className=' p-4 '>
                <div className='md:flex justify-center gap-5 pb-4'>
                    <div >
                        <label htmlFor="name"> <span className='font-semibold text-black text-xl'>Course Name</span> <br />
                            <input className='px-4 rounded-sm bg-white w-96 py-1' type="text" defaultValue={name} name="name" id="name " placeholder='course Name' required />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="name"> <span className='font-semibold text-black text-xl'>Duration</span> <br />
                            <input className='px-4 rounded-sm w-96 bg-white py-1' type="text" defaultValue={duration} name="duration" id="duration" placeholder='duration' required />
                        </label>
                    </div>
                </div>
                <div className='md:flex justify-center gap-4 pb-4'>
                    <div>
                        <label htmlFor="name"> <span className='font-semibold text-black text-xl'>Instructor Name</span> <br /></label>
                        <input className='px-4 rounded-sm w-96 bg-white py-1' type="text" defaultValue={instructorName} name="instructorName" id="instructorName" placeholder='' required />
                    </div>
                    <div>
                        <label htmlFor="name"> <span className='font-semibold text-black text-xl'>Email</span> <br /></label>
                        <input className='px-4 rounded-sm w-96 bg-white py-1' type="text" defaultValue={user?.email} name="email" id="email" placeholder='' required />
                    </div>
                </div>
                <div className='md:flex justify-center gap-4 pb-4'>
                    <div>
                        <label htmlFor="name"> <span className='font-semibold text-black text-xl'>Available Seats</span> <br />
                        </label>
                        <input className='px-4 rounded-sm w-96 bg-white py-1' type="text" defaultValue={availableSeats} name="availableSeats" id="availableSeats" placeholder='' />
                    </div>
                    <div>
                        <label htmlFor="name"> <span className='font-semibold text-black text-xl'>Price</span> <br /></label>
                        <input className='px-4 rounded-sm w-96 bg-white py-1' type="text" defaultValue={price} name="details" id="price" placeholder='' />
                    </div>

                </div>
                <div className="md:flex justify-center gap-4 pb-4">
                    <div>
                        <label htmlFor="name"> <span className='font-semibold text-black text-xl'>image*</span> <br /></label>
                        <input type="file" name="image" className="file-input file-input-bordered bg-white w-full max-w-xs" required />
                    </div>
                </div>
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent transition duration-200 bg-neutral-400 px-4 py-2 text-xl font-bold text-white hover:bg-neutral-500 focus:outline-none cursor-pointer btn btn-block mt-7">
                    {loading ? <TbLoader3 className="m-auto animate-spin text-orange-600" size={24} /> : 'Add Course'}
                </button>
            </form>
        </div>
    );
};

export default UpdateCourse;