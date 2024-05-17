import Container from "../../../components/shared/Container";
import { useEffect, useState } from "react";
import { getTestimonials } from "../../../apis/testimonials";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { FreeMode} from 'swiper/modules'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const Testimonial = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getTestimonials()
            .then(data => {
                setTestimonials(data)
                setLoading(false);
            })
            .catch(error => console.log(error))
    }, [])
   
    return (
        <div className=" bg-neutral-100 mt-10 shadow-sm">
            <hr />
            <Container>
                <section className="pb-14 lg:mx-40">
                <p className="lg:text-5xl md:text-3xl text-2xl text-center font-thin text-neutral-800 mb-4">Our Happy Students</p>
                    <Swiper
                       slidesPerView={2}
                        spaceBetween={15}
                        freeMode={true}

                        modules={[FreeMode]}
                        className="mySwiper">
                        {
                            testimonials.map((testimonial, index) =>
                                <SwiperSlide key={index} className="block">

                                    <div className="md:w-96 bg-neutral-800 rounded p-4 cursor-pointer text-gray-300 mt-12 relative group ">
                                        <div className="flex justify-between pb-4 ">
                                            <div className="flex gap-4">
                                                <img className="rounded-full" src={testimonial.image} alt="" height={50} width={50} />
                                                <div>
                                                    <h3 className="text-white font-semibold">{testimonial.name}</h3>
                                                    <h5 className="text-neutral-400">{testimonial.work}</h5>
                                                </div>
                                            </div>
                                            <div className="hidden group-hover:flex " ><FaArrowUpRightFromSquare  className="text-yellow-600 transition duration-200"/></div>
                                        </div>
                                        <p >
                                            {testimonial.description}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            )
                        }


                    </Swiper>
                </section>
            </Container>
        </div>
    );
};

export default Testimonial;
