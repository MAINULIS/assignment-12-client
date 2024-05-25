import { Fragment} from "react";
import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'

const SeeFeedback = ({isOpen, closeModal, course, feedbacks}) => {
    


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
                                    <DialogTitle as="h3" className="text-2xl  font-bold text-center leading-6 text-black pb-3">
                                        Feedback about {course.name} language course
                                    </DialogTitle>
                                    <div className="text-center text-xl text-orange-500 border border-dashed p-4">
                                        
                                    {
                                        feedbacks.map(feedback => <div key={feedback._id}>
                                            {course._id === feedback.feedbackId && <span>{feedback.feedback}</span> }
                                            </div>)
                                    }
                                    </div>
                                    
                                        <div className="mt-4 flex justify-around">
                                            <Button
                                                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                                onClick={closeModal}
                                            >
                                                close
                                            </Button>
                                        </div>
                                    

                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        
        </>
    );
};

export default SeeFeedback;