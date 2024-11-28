import HandCraft from './HandCraft';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import BannerSection from './BannerSection';
import { banner } from '../Data/Banner'
import 'swiper/css';
import 'swiper/css/navigation';
import './SwiperCss/Swiper.css'
import Barista from './Barista';
import { BaristaData } from '../Data/BaristaData'

const Home = () => {
    return (
        <main className='pb-5'>
            <section className='bg-[#1e3932] px-5 font-[sans-serif] text-white cursor-pointer'>
                <div className='flex justify-between items-center m-auto px-8 w-full max-w-[1240px] h-20'>
                    <h5 className='font-thin text-lg tracking-widest'>StarBucks</h5>
                    <p className='border-2 border-white px-3 py-2 rounded-3xl text-xs'>Know More</p>
                </div>
            </section>
            <section className='m-auto max-w-[1240px] h-60'>
                <div className='m-auto mt-6 w-full h-full'>
                    <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        className="m-auto w-[1240px] h-full mySwiper">
                        <SwiperSlide><BannerSection Banner={banner[0]} /></SwiperSlide>
                        <SwiperSlide><BannerSection Banner={banner[1]} /></SwiperSlide>
                    </Swiper>
                </div>
            </section>
            <HandCraft />
            <section className='relative bg-[#edebe9] min-h-72'>
                <div className='m-auto max-w-[1240px] h-60'>
                    <img className='top-0 right-0 absolute w-14' src="https://www.starbucks.in/assets/icon/greyleafright.svg" alt="greyLeafright" />
                    <div className='flex justify-between py-7'>
                        <h1 className='font-bold text-2xl'>Barista Recommends</h1>
                        <p className='text-[#00754a] cursor-pointer'>View Menu</p>
                    </div>
                    <div className='m-auto mb-10 max-w-[1240px]'>
                        <Swiper
                            navigation={true}
                            slidesPerView={3}
                            spaceBetween={20}
                            modules={[Navigation]}
                            className="m-auto w-[840px] h-full mySwiper2">
                            {BaristaData.map((item, i) =>
                                <SwiperSlide key={i}>
                                    <Barista key={i} item={item} />
                                </SwiperSlide>
                            )}
                        </Swiper>
                    </div>
                </div>
            </section>

        </main>
    )
}

export default Home