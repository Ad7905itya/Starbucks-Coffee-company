import React from 'react'

const NotFoundCards = () => {
    return (
        <section className='py-5'>
            <div className='flex flex-col justify-center items-center gap-2 bg-white py-5'>
                <img src="https://www.starbucks.in/assets/icon/no-menu-found.svg" loading='lazy' alt="" />
                <h2 className='font-bold text-lg'>No menu found!</h2>
                <p className='font-[Rubik] font-thin text-[rgba(0,0,0,0.6)] text-sm tracking-wider'>Please try after some time.</p>
            </div>
            <div className='bg-[#f9f9f9]'>
                <div className='flex items-center gap-2 m-auto px-4 py-6 max-w-[1280px]'>
                    <img src="https://www.starbucks.in/assets/icon/info.png" loading='lazy' alt="" />
                    <div className='flex flex-col justify-between gap-5 font-[Rubik] text-[11px] text-[rgba(0,0,0,0.6)]'>
                        <p className='tracking-wider'>An average active adult requires 2,000 kcal energy per day, however, calorie needs may vary.</p>
                        <p>FSSAI License No.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFoundCards