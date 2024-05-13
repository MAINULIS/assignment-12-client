import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import SocialLogin from "./SocialLogin";

const SignUp = () => {
    const { createUser, updateUserProfile, loading, setLoading } = useContext(AuthContext);
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const name = data.name;
        const email = data.email;
        const pass = data.password;
        const confirmPass = data.confirmPass;
        if (pass !== confirmPass) {
            toast.error('Password Did Not Matched!')
            setLoading(false)
            return;
        }
        // image upload
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_KEY}`;
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imageData => {
                const imageUrl = imageData.data.display_url;
                console.log(imageUrl);
                // create user
                createUser(email, pass)
                    .then(result => {
                        console.log(result.user);
                        // update profile info
                        updateUserProfile(name, imageUrl)
                            .then(() => {
                                setLoading(false)
                                navigate(from, { replace: true })
                            })
                            .catch(error => {
                                console.log(error);
                            })

                        toast.success("Your account successfully created")
                        reset();
                        setLoading(false)
                    })
                    .catch(error => {
                        console.log(error.message);
                        setLoading(false);
                    })

            })
    }

    return (
        <div className="py-24">
            <div className="card md:w-1/2 max-w-sm mx-auto  border rounded-none rounded-t-md ">
                <h2 className="text-xl md:text-2xl text-slate-100 lg:text-3xl bg-stone-800 rounded-t-md  font-semibold text-center py-4">Language Learning School</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body text-neutral-500">
                    <h1 className="text-xl md:text-2xl lg:text-3xl text-center text-stone-700 font-semibold md:font-bold whitespace-nowrap">Great to see you here!</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl text-black">Name</span>
                        </label>
                        <input type="text" name="name" {...register("name", { required: true })} placeholder="type here" className="input input-bordered bg-white" />
                        {errors.name && <span className="text-warning"> Name is required</span>}
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text text-xl text-black">Select Image</span>
                        </label>
                        <input type="file" name="image" className="file-input file-input-bordered file-input-accent w-full max-w-xs" {...register("image", { required: true })} />
                        {errors.image && <span className="text-warning">Image is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl text-black">Username or Email</span>
                        </label>
                        <input type="email" name="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered bg-white" />
                        {errors.email && <span className="text-warning">Email is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl text-black">Password</span>
                        </label>
                        <input type={show ? 'text' : 'password'} placeholder="password" {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 12,
                            pattern: /((?=.*[A-Z])||(?=.*[a-z]))(?=.*[@!#$&*])/
                        })} name="password" className="input input-bordered bg-white" />
                        <p onClick={() => setShow(!show)}> {
                            show ? <span className="flex mt-1 gap-1"><MdCheckBox className="mt-1 cursor-pointer" size={20} />Hide</span> : <span className="flex mt-1 gap-1"> <MdCheckBoxOutlineBlank className="mt-1 cursor-pointer" size={20} /> Show</span>
                        } </p>
                        {errors.password?.type === "minLength" && <p className="text-red-500">Password should be at least six characters</p>}
                        {errors.password?.type === "pattern" && <p className="text-red-500">Please use at least one Alphabet and one special characters(!@#$&*) </p>}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl text-black">Confirm Password</span>
                        </label>
                        <input type="password" placeholder="password" {...register("confirmPass", {
                            required: true,
                            minLength: 6,
                            maxLength: 12,
                        })} name="confirmPass" className="input input-bordered bg-white" />
                        {errors.confirmPass?.type === "minLength" && <p className="text-red-500">Password should be at least six characters</p>}
                    </div>

                    <div className="form-control mt-6">
                        {/* <input className="btn bg-lime-600 hover:bg-lime-500 font-bold border-none text-white lg:text-lg" type="submit" value="Sign Up" /> */}
                        <button type="submit" className="btn bg-cyan-600 hover:bg-cyan-600 font-bold border-none text-white lg:text-lg">
                            {loading ? <ImSpinner3 className="mx-auto animate-spin" size={26} /> : " Sign Up "}
                        </button>
                    </div>
                    <div className='text-center'>
                        <p className=''>Already have an Account? <Link to="/login" className='underline font-semibold text-sky-600'>Sign in here.</Link></p>
                    </div>
                </form>
                <div className="-mt-3">
                    <h5 className='text-center text-xl font-semibold text-neutral-500 divider'> or </h5>
                    {/* social login */}
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default SignUp;