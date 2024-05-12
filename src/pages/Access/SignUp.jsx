import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [show, setShow] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    return (
        <div className="py-24">
            <div className="card md:w-1/2 max-w-sm mx-auto  border rounded-none rounded-t-md ">
                <h2 className="text-xl md:text-2xl text-slate-100 lg:text-3xl bg-stone-800 rounded-t-md  font-semibold text-center py-4">Language Learning School</h2>
                        <form onSubmit={handleSubmit()} className="card-body text-neutral-500">
                            <h1 className="text-xl md:text-2xl lg:text-3xl text-center text-stone-700 font-semibold md:font-bold whitespace-nowrap">Great to see you here!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl text-black">Name</span>
                                </label>
                                <input type="text" name="name" {...register("name", { required: true })} placeholder="type here" className="input input-bordered bg-white" />
                                {errors.name && <span className="text-warning"> Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl text-black">Photo URL</span>
                                </label>
                                <input type="url" name="url" {...register("url", { required: true })} placeholder="photo url" className="input input-bordered bg-white" />
                                {errors.url && <span className="text-warning"> Photo URL is required</span>}
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
                                <input type={show? 'text' : 'password'} placeholder="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 12,
                                    pattern: /((?=.*[A-Z])||(?=.*[a-z]))(?=.*[@!#$&*])/
                                })} name="password" className="input input-bordered bg-white" />
                                <p onClick={() => setShow(!show)}> {
                                    show ? <span className="flex mt-1 gap-1"><MdCheckBox className="mt-1 cursor-pointer" size={20} />Hide</span> : <span className="flex mt-1 gap-1"> <MdCheckBoxOutlineBlank  className="mt-1 cursor-pointer" size={20} /> Show</span>
                                } </p>
                                {errors.password?.type === "minLength" && <p className="text-red-500">Password should be at least six characters</p>}
                                {errors.password?.type === "pattern" && <p className="text-red-500">Please use at least one Alphabet and one special characters(!@#$&*) </p>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl text-black">Confirm Password</span>
                                </label>
                                <input type="password" placeholder="password" {...register("confirm password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 12,
                                })} name="confirm password" className="input input-bordered bg-white" />
                                {errors.password?.type === "minLength" && <p className="text-red-500">Password should be at least six characters</p>}
                                {errors.password && <p className="text-red-500">Password Din Not Matched</p>}

                            </div>

                            <div className="form-control mt-6">
                                <input className="btn bg-lime-600 hover:bg-lime-500 font-bold border-none text-white lg:text-lg" type="submit" value="Sign Up" />
                            </div>
                        <div className='text-center'>
                            <p className=''>Already have an Account? <Link to="/login" className='underline font-semibold text-sky-600'>Sign in here.</Link></p>
                        </div>
                        </form>
                        <div>
                            <h5 className='text-center text-xl font-semibold text-neutral-500 divider'> or </h5>
                             {/* social login */}
                        </div>
                    </div>
        </div>
    );
};

export default SignUp;