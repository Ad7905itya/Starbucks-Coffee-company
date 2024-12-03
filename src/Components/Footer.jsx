import React from 'react'

const Footer = () => {
    return (
        <section className='flex flex-col bg-[#0e382c] mt-10 px-8'>
            <div className='flex justify-between items-start border-[rgba(255,255,255,0.6)] m-auto py-5 pt-28 pb-20 border-b-[1px] w-full max-w-[1240px]'>
                <img className='mr-10' src="https://www.starbucks.in/assets/icon/logo.png" alt="" loading='lazy' />
                <div className='flex flex-col gap-3 w-40 text-white'>
                    <h1 className='font-bold text-xl cursor-pointer'>About Us</h1>
                    <div className='flex flex-col gap-8 text-slate-200 text-sm'>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">Our Heritage</p>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">Coffeehouse</p>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">Our Company</p>
                    </div>
                </div>
                <div className='flex flex-col gap-3 text-white'>
                    <h1 className='font-bold text-xl cursor-pointer'>Responsibility</h1>
                    <div className='flex flex-col gap-8 text-slate-200 text-sm'>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">Diversity</p>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">Community</p>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">Ethical Sourcing</p>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">Environmental Stewardship</p>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">Learn More</p>
                    </div>
                </div>
                <div className='flex flex-col gap-3 text-white'>
                    <h1 className='font-bold text-xl cursor-pointer'>Quick Links</h1>
                    <div className='flex flex-col gap-8 text-slate-200 text-sm'>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">Privacy Policy</p>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">FAQs</p>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">Starbucks India Mobile App Terms of Use</p>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">Customer Service</p>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">Delivery</p>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">Season's Gifting</p>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">Loyalty Program Terms and Conditions</p>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">Starbucks Rewards Day Offer</p>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">Diwali Bonus Star Offer</p>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">Beverage Subscription</p>
                        <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">Classics Combo Offer</p>
                    </div>
                </div>
                <div className='flex flex-col gap-3 text-white'>
                    <h1 className='font-bold text-lg uppercase cursor-pointer'>Social Media</h1>
                    <div className='flex gap-6 text-slate-200'>
                        <img className='cursor-pointer' src="https://www.starbucks.in/assets/icon/instagram.svg" alt="instagram" loading='lazy' />
                        <img className='cursor-pointer' src="https://www.starbucks.in/assets/icon/facebook.svg" alt="facebook" loading='lazy' />
                        <img className='cursor-pointer' src="https://www.starbucks.in/assets/icon/twitter.svg" alt="twitter" loading='lazy' />
                    </div>
                </div>
                <div className='ml-10'>
                    <img className='cursor-pointer' src="https://www.starbucks.in/assets/images/appstoreiOS.png" alt="" loading='lazy' />
                    <img className='mt-2 cursor-pointer' src="https://www.starbucks.in/assets/images/appstoreAndroid.png" alt="" loading='lazy' />
                </div>
            </div>
            <div className='flex justify-between m-auto mt-5 mb-10 w-full max-w-[1240px] text-white'>
                <ul className='flex text-xs'>
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