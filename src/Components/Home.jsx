import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { banner } from '../Data/Banner'
import 'swiper/css';
import 'swiper/css/navigation';
import './SwiperCss/Swiper.css'
const Barista = React.lazy(() => import('./Barista'));
const HandCraft = React.lazy(() => import('./HandCraft'));
const BannerSection = React.lazy(() => import('./BannerSection'));
const Footer = React.lazy(() => import('./footer/Footer'));
import { BaristaData } from '../Data/BaristaData'
import { Link } from 'react-router-dom';

export const CustomizeSwiper = ({ isOpen, className, slide, spaceBetween, children }) => {
    return (
        <Swiper
            navigation={isOpen}
            slidesPerView={slide}
            spaceBetween={spaceBetween}
            modules={[Navigation]}
            className={className}>
            {children}
        </Swiper>
    )
}




const Home = () => {
    const [Slide, setSlide] = useState(3);

    useEffect(() => {
        setInterval(()=>{
            if (innerWidth > 1000) {
                setSlide(3)
            } else if (1000 >= innerWidth && innerWidth > 500) {
                setSlide(2.2);
            } else {
                setSlide(1);
            }
        },1000)
    },[]);

return (
    <main>
        <section className='lg:block hidden bg-[#1e3932] px-5 font-[sans-serif] text-white cursor-pointer'>
            <Link to="/rewards">
                <div className='flex justify-between items-center m-auto px-8 w-full max-w-[1260px] h-16'>
                    <p className='px-5 py-[6px] rounded-3xl text-lg'>StarBucks</p>
                    <p className='border-[1px] border-white px-5 py-[6px] rounded-3xl text-[10px]'>Know More</p>
                </div>
            </Link>
        </section>
        <section className='m-auto px-8 max-w-[800px] lg:max-w-[1320px] h-48 lg:h-60'>
            <div className='m-auto mt-0 lg:mt-6 w-full h-full'>
                <CustomizeSwiper
                    isOpen={true}
                    slide={1}
                    spaceBetween={10}
                    className="m-auto w-[1240px] h-full mySwiper">
                    {banner.map((item, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <BannerSection key={i} Banner={item} />
                            </SwiperSlide>
                        )
                    })}
                </CustomizeSwiper>
            </div>
        </section>
        <HandCraft />
        <section className='relative bg-[#edebe9] px-4 lg:px-8 min-h-72'>
            <div className='m-auto max-w-[700px] lg:max-w-[1240px] h-60'>
                <img className='top-0 right-0 absolute w-14' src="https://www.starbucks.in/assets/icon/greyleafright.svg" alt="greyLeafright" />
                <div className='flex justify-between py-7'>
                    <h1 className='font-bold text-[#25453d] text-xl lg:text-2xl'>Barista Recommends</h1>
                    <p className='font-bold text-[#00754a] text-xs lg:text-sm cursor-pointer'>View Menu</p>
                </div>
                <div className='m-auto mb-10 max-w-[800px] lg:max-w-[1240px]'>
                    <CustomizeSwiper
                        isOpen={true}
                        slide={Slide}
                        spaceBetween={20}
                        className="mx-auto h-full mySwiper1">
                        {BaristaData.map((item, i) =>
                            <SwiperSlide key={i}>
                                <Barista key={i} item={item} />
                            </SwiperSlide>
                        )}
                    </CustomizeSwiper>
                </div>
            </div>
        </section>
        <section className='relative bg-[#edebe9] mt-10 px-8 min-h-[450px]'>
            <div className='m-auto max-w-[800px] lg:max-w-[1240px] h-60'>
                <div className='flex justify-between py-7'>
                    <h1 className='font-bold text-[#25453d] text-xl lg:text-2xl'>Learn more about the world of coffee!</h1>
                    <p className='font-bold text-[#00754a] text-xs lg:text-sm cursor-pointer'>Discover More</p>
                </div>
                <div style={{ backgroundImage: `url('https://preprodtsbstorage.blob.core.windows.net/cms/uploads/ICW_Live_Event_Day5_41f11ca3d2.jpg')` }} className='relative bg-cover bg-center shadow-inner p-6 rounded-xl w-full min-h-80 transition-all cursor-pointer'>
                    <div className='absolute'>
                        <h1 className='bg-[#e6edeb] px-2 py-1 rounded-md text-[#096] text-[8px] sm:text-[10px] tracking-wider'>Coffee culture</h1>
                    </div>
                    <div className='bottom-5 absolute flex flex-col items-start text-white'>
                        <h1 className='mb-2 font-bold text-xl lg:text-2xl'>Art & Science Of Coffee Brewing</h1>
                        <p className='mb-8 text-slate-300 text-sm lg:text-base'>Master the perfect brew with Starbucks! Learn the art and science of coffee brewing.</p>
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