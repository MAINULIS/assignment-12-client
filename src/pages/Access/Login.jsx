import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    return (
        <div className="py-24">
            <div className="card md:w-1/2 max-w-sm mx-auto  border rounded-none rounded-t-md">
                <h2 className="text-xl md:text-2xl text-slate-100 lg:text-3xl bg-stone-800 rounded-t-md  font-semibold text-center py-4">Language Learning School</h2>
                        <form onSubmit={handleSubmit()} className="card-body text-neutral-500">
                            <h1 className="text-xl md:text-2xl lg:text-3xl text-center text-stone-700 font-semibold md:font-bold whitespace-nowrap">Great to have you back!</h1>
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
                                <input type="password" placeholder="* * * * * *" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                })} name="password" className="input input-bordered bg-white" />
                                {errors.password?.type === "minLength" && <p className="text-red-500">Password should be at least six characters</p>}
                                {errors.password  && <p className="text-red-500">Password Did Not Matched!</p>}

                            </div>

                            <div className="form-control mt-6">
                                <input className="btn bg-lime-600 hover:bg-lime-500 font-bold border-none text-white" type="submit" value="Sign In" />
                            </div>
                        <div className='text-center'>
                            <p className=''>New here? <Link to="/signup" className='underline font-semibold text-sky-600'>Create an account </Link></p>
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

export default Login;