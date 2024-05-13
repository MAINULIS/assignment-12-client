import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import SocialLogin from "./SocialLogin";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.form?.pathname || '/';
    const [show, setShow] = useState(false);
    const {
        loading, 
        setLoading,
        signIn,
        resetPassword,
    } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // console.log(data);
        signIn(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            navigate(from, {replace:true})
            reset(); 
            toast.success('You have been successfully signed in !')
            setLoading(false);
        })
        .catch(error => {
            console.log(error.message);
            toast.error(error.message);
            setLoading(false)
        })
    }

    const handleResetPass = () => {
        const email = watch("email")
        if(!email){
            toast("Please provide your email to reset password")
            return;
        }
        resetPassword(email)
        .then( () => {
            toast.success("Please check your email box to reset password");
            setLoading(false);
        })
        .catch( error => {
            toast.error(error.message)
            setLoading(false)
          })
    }
    return (
        <div className="py-24">
            <div className="card md:w-1/2 max-w-sm mx-auto  border rounded-none rounded-t-md">
                <h2 className="text-xl md:text-2xl text-slate-100 lg:text-3xl bg-stone-800 rounded-t-md  font-semibold text-center py-4">Language Learning School</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body text-neutral-500">
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
                        <input type={show ? 'text' : 'password'} placeholder="* * * * * *" {...register("password", {
                            required: true,
                            minLength: 6,
                        })} name="password" className="input input-bordered bg-white" />
                        <div className="flex justify-center">
                            <p onClick={() => setShow(!show)}> {
                                show ? <span className="flex mt-1 gap-1"><MdCheckBox className="mt-1 cursor-pointer" size={20} />Hide</span> : <span className="flex mt-1 gap-1"> <MdCheckBoxOutlineBlank className="mt-1 cursor-pointer" size={20} /> Show</span>
                            } </p>
                            <p className='text-zinc-600 font-semibold mt-1'><small>Forget password? <button
                            onClick={handleResetPass} className='text-cyan-600 underline'>Reset</button> </small>
                            </p>
                        </div>
                        {errors.password?.type === "minLength" && <p className="text-red-500">Password should be at least six characters</p>}

                    </div>

                    <div className="form-control mt-6">
                        {/* <input className="btn bg-lime-600 hover:bg-lime-500 font-bold border-none text-white lg:text-lg" type="submit" value="Sign In" /> */}
                        <button type="submit" className="btn bg-cyan-600 hover:bg-cyan-600 font-bold border-none text-white lg:text-lg">
                        {loading ? <ImSpinner3 className="mx-auto animate-spin" size={26} /> : " Sign In "}
                        </button>
                    </div>
                    <div className='text-center'>
                        <p className=''>New here? <Link to="/signup" className='underline font-semibold text-sky-600'>Create an account </Link></p>
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

export default Login;