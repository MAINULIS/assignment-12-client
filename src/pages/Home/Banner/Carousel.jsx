import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import img1 from '../../../assets/images/banner/img1.jpg';
import img2 from '../../../assets/images/banner/img2.jpg';
import img3 from '../../../assets/images/banner/img3.jpg';
import img4 from '../../../assets/images/banner/study.jpg';


// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import Card from './Card';
const Carousel = () => {
    return (
        <div>
            <Swiper
                navigation={true}
                pagination={true}
                modules={[Navigation, Pagination]}
                className="mySwiper">

                <SwiperSlide>
                    <Card img={img1} heading="To have another language is to possess a second soul."></Card>
                </SwiperSlide>
                <SwiperSlide>
                    <div className=" relative w-full">
                        <img src={img3} className="w-full  lg:h-[800px]" />
                        <div className="absolute flex items-center md:top-1/2 bottom-0  justify-center lg:w-full p-4">
                            <div className='space-y-6 md:w-1/3  w-1/2 ml-4  bg-gradient-to-b text-center rounded from-[#151515c0] to-[rgba(21, 21, 21, 0.00'>
                                <p className='text-2xl md:text-4xl lg:text-5xl text-white font-semibold lg:font-bold'>
                                    Every student matters,every moment counts.
                                </p>
                                <div className='items-center uppercase '>
                                    <button className="btn px-4 bg-cyan-700 hover:bg-cyan-600 md:font-bold text-white lg:text-lg">Enroll Now </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <Card img={img4} heading="Teaching TurningToday's Learners Into Tomorrow's Leaders" position={'justify-end'}></Card>
                </SwiperSlide>
                <SwiperSlide>
                    <Card img={img2} heading="Unlock new cultures, connect globally, expand horizons, thrive with language mastery. Join today!"></Card>
                </SwiperSlide>


            </Swiper>
        </div>
    );
};

export default Carousel;