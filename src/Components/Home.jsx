import React from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/navigation';
import 'swiper/css'

const Home = () => {
    return (
        <main>
            <section className='bg-[#1e3932] px-5 font-[sans-serif] text-white cursor-pointer'>
                <div className='flex justify-between items-center m-auto px-8 w-full max-w-[1440px] h-20'>
                    <h5 className='font-thin text-lg tracking-widest'>StarBucks</h5>
                    <p className='border-2 border-white px-3 py-2 rounded-3xl text-xs'>Know More</p>
                </div>
            </section>
            <section className='m-auto max-w-[1440px] h-60'>
                <div className='m-auto mt-14 w-[80%] h-full'>
                    <Swiper navigation={true} modules={[Navigation]} className="m-auto w-[1000px] h-full mySwiper">
                        <SwiperSlide>
                            <div className='flex items-center h-full'>
                                <div className='bg-[url(https://preprodtsbstorage.blob.core.windows.net/cms/uploads/36_Holiday_Dashboard_05_1_eaa2feb94e.png)] bg-cover bg-no-repeat bg-center shadow-4xl rounded-xl w-full h-[90%]'>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </main>
    )
}

export default Home