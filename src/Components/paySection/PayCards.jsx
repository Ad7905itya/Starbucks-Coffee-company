import React from 'react'

const PayCards = ({ Active }) => {
    return (
        <section className='bg-[#1e3932] p-8'>
            <aside className='relative'>
                <img className='-top-8 -right-8 absolute' src="https://www.starbucks.in/assets/icon/Group%20625.svg" loading='lazy' alt="" />
                <aside className='flex justify-start items-end gap-14 mx-auto px-6 py-3 max-w-[800px] lg:max-w-[1280px] h-[270px]'>
                    <div className='-left-6 absolute'>
                        <img src="https://www.starbucks.in/assets/images/green-left-leaf.svg" loading='lazy' alt="" />
                    </div>
                    <div style={{ filter: Active.firstSec && 'brightness(60%)' }} className='bg-white rounded-lg w-full max-w-[380px] h-full overflow-hidden'>
                        <img className='w-full h-[140px]' src="https://preprodtsbstorage.blob.core.windows.net/cms/uploads/c08a5364_1d63_4d53_8bba_6b95bd1b05fe_6_90ea914d7c.png" loading='lazy' alt="" />
                        <div className='flex justify-between items-center px-4 pt-3'>
                            <h1>aroma | <span className='opacity-55 text-[#00754a]'>* 3812</span></h1>
                            <button className='flex items-center gap-2 bg-[#00754a] hover:bg-[#1e3932] px-5 py-2 rounded-3xl font-bold text-[10px] text-white'> <img src="https://www.starbucks.in/assets/icon/autoreload_thick.svg" loading='lazy' alt="" />Load Card</button>
                        </div>
                        <h1 className='px-4 pt-0 pb-2 font-bold text-[#00754a] text-2xl'>₹0.00</h1>
                        <div className='flex justify-between items-center px-4 pb-3'>
                            <p className='opacity-50 text-[8px]'>Updated at 08:19 AM on 15/12/2024 </p>
                            <div className='flex items-center gap-2'>
                                <img loading='lazy' src="https://www.starbucks.in/assets/icon/Maskrefresh.svg" alt="" />
                                <img loading='lazy' src="https://www.starbucks.in/assets/icon/Masksetting.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div style={{ filter: Active.secondSec && 'brightness(60%)' }} className='relative flex justify-center items-center bg-white rounded-lg w-full max-w-[380px] h-full overflow-hidden'>
                        <img className='absolute' src="https://www.starbucks.in/assets/images/bg_pattern.svg" loading='lazy' alt="" />
                        <div className='flex flex-col items-center gap-2'>
                            <h1 className='font-bold text-xl'>Add new Starbucks card</h1>
                            <button className='flex items-center gap-2 bg-[#000000] active:bg-[#1e3932] px-6 py-2 rounded-3xl font-bold text-[#c7c7c7] text-xs'><img src="https://www.starbucks.in/assets/icon/add_circle_darkened_green.svg" loading='lazy' alt="" />Add Card</button>
                        </div>
                    </div>
                </aside>
            </aside>
        </section>
    )
}

export default PayCards