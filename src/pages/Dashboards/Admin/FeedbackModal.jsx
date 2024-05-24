import { Fragment } from "react";
import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const FeedbackModal = ({ isOpen, closeModal, course, modalHandler }) => {
    const { register, handleSubmit, reset } = useForm();
    const [axiosSecure] = useAxiosSecure();

    const onSubmit = data => {
        const feedback = data.feedback;
        if(feedback.length === 0) {
            return ;
        }  
        const name = course.name;
        const instructorName = course.instructorName;
        const email = course.email;
        const status = course.status;
        const sendFeedback = {name,instructorName, email,status, feedback};

        axiosSecure.post('/feedback', sendFeedback)
            .then(data => {
                console.log(data.data);
                if(data.data.insertedId){
                    reset();
                    toast.success(`Your feedback successfully sent to ${course.instructorName} !`)
                closeModal()
                }
                
            })
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={closeModal}>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
                        <div className="flex min-h-full items-center justify-center p-4 ">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <DialogPanel className="w-full max-w-md rounded-xl p-6 backdrop-blur-2xl bg-sky-300">
                                    <DialogTitle as="h3" className="text-2xl  font-bold text-center leading-6 text-black">
                                        {`Sending feedback to ${course.instructorName}`}
                                    </DialogTitle>

                                    <form onSubmit={handleSubmit(onSubmit)} action="">
                                        <label className="form-control">
                                            <div className="label">
                                                <span className="label-text font-semibold text-gray-900 text-xl">{`Write Your Feedback about ${course.name} language course`}</span>
                                            </div>
                                            <textarea {...register("feedback", { required: true })} className="textarea textarea-bordered h-24 bg-white text-gray-800 font-medium text-xl" placeholder="Write your feedback..."></textarea>
                                            <div className="label">
                                            </div>
                                        </label>
                                        <div className="mt-4 flex justify-around">
                                            <Button
                                                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                                onClick={closeModal}
                                            >
                                                Cancel
                                            </Button>
                                            <Button type="submit"
                                                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                                onClick={() => modalHandler(course._id)}
                                            >
                                                Send Feedback
                                            </Button>
                                        </div>
                                    </form>


                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default FeedbackModal;