import React from 'react'
import FooterHeader from './FooterHeader'
import { footerData } from '../../Data/FooterData'


const Footer = () => {
    return (
        <section className='flex flex-col bg-[#0e382c] mt-10 px-8 overflow-hidden'>
            <div className='relative flex justify-between items-start border-[rgba(255,255,255,0.6)] m-auto py-5 pt-28 pb-20 border-b-[1px] w-full max-w-[800px] lg:max-w-[1240px]'>
                <img className='top-3 left-1/2 lg:static absolute mr-10' src="https://www.starbucks.in/assets/icon/logo.png" alt="" loading='lazy' />

                <div className='flex justify-around gap-5 w-full'>
                    {footerData.map((item, i) => <FooterHeader key={i} Text={item} />)}
                </div>

                <div className='flex justify-between gap-10'>
                    <div className='flex flex-col gap-3 text-white'>
                        <h1 className='font-bold text-sm lg:text-lg uppercase cursor-pointer'>Social Media</h1>
                        <div className='flex gap-2 lg:gap-4 text-slate-200'>
                            <img className='w-8 lg:w-auto cursor-pointer' src="https://www.starbucks.in/assets/icon/instagram.svg" alt="instagram" loading='lazy' />
                            <img className='w-8 lg:w-auto cursor-pointer' src="https://www.starbucks.in/assets/icon/facebook.svg" alt="facebook" loading='lazy' />
                            <img className='w-8 lg:w-auto cursor-pointer' src="https://www.starbucks.in/assets/icon/twitter.svg" alt="twitter" loading='lazy' />
                        </div>
                    </div>
                    <div className='w-[200px]'>
                        <img className='cursor-pointer' src="https://www.starbucks.in/assets/images/appstoreiOS.png" alt="" loading='lazy' />
                        <img className='mt-2 cursor-pointer' src="https://www.starbucks.in/assets/images/appstoreAndroid.png" alt="" loading='lazy' />
                    </div>
                </div>
            </div>
            <div className='flex justify-between m-auto mt-5 mb-10 w-full max-w-[800px] lg:max-w-[1240px] text-white'>
                <ul className='flex text-[10px] lg:text-xs'>
                    <li className='pr-5 hover:text-[#a2a2a2] transition-all cursor-pointer'>Web Accessiblity</li>
                    <li className='border-white px-5 border-l-2 hover:text-[#a2a2a2] transition-all cursor-pointer'>Privacy Statement</li>
                    <li className='border-white px-5 border-l-2 hover:text-[#a2a2a2] transition-all cursor-pointer'>Terms of Use</li>
                    <li className='border-white px-5 border-l-2 hover:text-[#a2a2a2] transition-all cursor-pointer'>Contact Us</li>
                </ul>
                <p className='font-sans font-thin text-[10px] hover:text-[#a2a2a2] tracking-wider transition-all cursor-pointer'>© 2024 Starbucks Coffee Company. All rights reserved.</p>
            </div>
        </section>
    )
}

export default Footer