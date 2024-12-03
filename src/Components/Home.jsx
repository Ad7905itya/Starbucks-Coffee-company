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
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Home = () => {
    const [LazyImageLoad, setLazyImageLoad] = useState('')
    const url = 'https://preprodtsbstorage.blob.core.windows.net/cms/uploads/ICW_Live_Event_Day5_41f11ca3d2.jpg';

    useEffect(() => {
        setLazyImageLoad(url);
    }, [])
    return (
        <main>
            <section className='bg-[#1e3932] px-5 font-[sans-serif] text-white cursor-pointer'>
                <Link to={'/rewards'}>
                    <div className='flex justify-between items-center m-auto px-8 w-full max-w-[1240px] h-20'>
                        <h5 className='font-thin text-lg tracking-widest'>StarBucks</h5>
                        <p className='border-2 border-white px-3 py-2 rounded-3xl text-xs'>Know More</p>
                    </div>
                </Link>
            </section>
            <section className='m-auto px-8 max-w-[1240px] h-60'>
                <div className='m-auto mt-6 w-full h-full'>
                    <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        className="m-auto w-[1240px] h-full mySwiper">
                        {banner.map((item, i) => {
                            return (
                                <SwiperSlide key={i}>
                                    <BannerSection key={i} Banner={item} />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </section>
            <HandCraft />
            <section className='relative bg-[#edebe9] px-8 min-h-72'>
                <div className='m-auto max-w-[1240px] h-60'>
                    <img className='top-0 right-0 absolute w-14' src="https://www.starbucks.in/assets/icon/greyleafright.svg" alt="greyLeafright" />
                    <div className='flex justify-between py-7'>
                        <h1 className='font-bold text-2xl'>Barista Recommends</h1>
                        <p className='font-bold text-[#00754a] text-sm cursor-pointer'>View Menu</p>
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
            <section className='relative bg-[#edebe9] mt-10 px-8 min-h-[450px]'>
                <div className='m-auto max-w-[1240px] h-60'>
                    <div className='flex justify-between py-7'>
                        <h1 className='font-bold text-2xl'>Learn more about the world of coffee!</h1>
                        <p className='font-bold text-[#00754a] text-sm cursor-pointer'>Discover More</p>
                    </div>
                    <div style={{ backgroundImage: `url(${LazyImageLoad})` }} className='relative bg-cover bg-center shadow-inner p-6 rounded-xl w-full min-h-80 transition-all cursor-pointer'>
                        <div className='absolute'>
                            <h1 className='bg-[#e6edeb] px-2 py-1 rounded-md text-[#096] text-[10px] tracking-wider'>Coffee culture</h1>
                        </div>
                        <div className='bottom-5 absolute flex flex-col items-start text-white'>
                            <h1 className='mb-2 font-bold text-2xl'>Art & Science Of Coffee Brewing</h1>
                            <p className='mb-8 text-slate-300'>Master the perfect brew with Starbucks! Learn the art and science of coffee brewing.</p>
                            <button className='bg-white mb-2 ml-5 px-10 py-[6px] rounded-2xl font-[sans-serif] font-medium text-black text-sm'>Learn More</button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}

export default Home