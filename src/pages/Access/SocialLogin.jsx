import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {signInWithGoogle, setLoading} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleLogin = () =>{
        signInWithGoogle()
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            toast.success('You have been successfully signed in !');
            setLoading(false)
            navigate(from, {replace:true})
        })
        .catch(error =>{
            console.log(error.message)
            toast.error(error.message)
            setLoading(false)
        })
    }
    return (
        <div>
            <div onClick={handleGoogleLogin} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                <FcGoogle size={32} />

                <p className="text-neutral-500">Continue with Google</p>
            </div>
            <div className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                <FaGithub size={32} />

                <p className="text-neutral-500">Continue with Github</p>
            </div>
        </div>
    );
};

export default SocialLogin;