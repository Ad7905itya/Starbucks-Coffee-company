import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import BannerSection from './BannerSection';
import { banner } from '../Data/Banner';
import 'swiper/css/navigation';
import './SwiperCss/Swiper.css';
import 'swiper/css'

const SwiperSection = () => {
    return (
        <section className='m-auto max-w-[1440px] h-60'>
            <div className='m-auto mt-14 w-[80%] h-full'>
                <Swiper navigation={true} modules={[Navigation]} className="m-auto w-[1000px] h-full mySwiper">
                    <SwiperSlide>
                        <BannerSection Banner={banner[0]} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <BannerSection Banner={banner[1]} />
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    )
}

export default SwiperSection