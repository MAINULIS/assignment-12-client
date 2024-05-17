import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const TestimonialCard = ({ testimonial }) => {
    return (
        <>
            <SwiperSlide>

                <div className="w-96 bg-neutral-800 rounded p-4 text-gray-200">
                    <div className="flex justify-between">
                        <div className="flex gap-4">
                            <img className="rounded-full" src={testimonial.image} alt="" height={50} width={50} />
                            <div>
                                <h3>{testimonial.name}</h3>
                                <h5>work</h5>
                            </div>
                        </div>
                        <p>dicon</p>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae ipsam quo tempore beatae at, similique sed veniam voluptatem cum tenetur corrupti aut cumque eius amet explicabo tempora, illum earum consequatur, accusamus voluptate! Iure harum accusantium impedit iusto?
                    </p>
                </div>
            </SwiperSlide>
        </>
    );
};

export default TestimonialCard;
{/* <div className="flex gap-7 justify-center items-center mx-auto pb-10">
    <div className="w-96 bg-neutral-800 rounded p-4 text-gray-200">
        <div className="flex justify-between">
            <div className="flex gap-4">
                <img className="rounded-full" src={testimonial.image} alt="" height={50} width={50} />
                <div>
                    <h3>{testimonial.name}</h3>
                    <h5>work</h5>
                </div>
            </div>
            <p>dicon</p>
        </div>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae ipsam quo tempore beatae at, similique sed veniam voluptatem cum tenetur corrupti aut cumque eius amet explicabo tempora, illum earum consequatur, accusamus voluptate! Iure harum accusantium impedit iusto?
        </p>
    </div>
    <div className="w-96 bg-neutral-800 rounded p-4 text-gray-200">
        <div className="flex justify-between">
            <div className="flex gap-4">
                <img className="rounded-full" src={testimonial.image} alt="" height={50} width={50} />
                <div>
                    <h3>Name</h3>
                    <h5>work</h5>
                </div>
            </div>
            <p>dicon</p>
        </div>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae ipsam quo tempore beatae at, similique sed veniam voluptatem cum tenetur corrupti aut cumque eius amet explicabo tempora, illum earum consequatur, accusamus voluptate! Iure harum accusantium impedit iusto?
        </p>
    </div>
</div> */}