import React from 'react'

const Reward = ({Data}) => {
    return (
        <section className='flex justify-between items-center bg-[#dfc49d] px-5 h-[320px]'>
            <img src="https://www.starbucks.in/assets/images/guest-bg-star-left.png" alt="" loading='lazy' />
            <div className='relative flex justify-between items-center w-full max-w-[1240px]'>
                <div className='relative -left-10 flex flex-col gap-14'>
                    <img className='w-28' src="https://preprodtsbstorage.blob.core.windows.net/cms/uploads/Logo_without_any_background_ba43098a6f.png" alt="" loading='lazy' />
                    <div>
                        <h1 className='mb-5 font-bold text-2xl'>{Data.HeaderName}</h1>
                        <button className='bg-white hover:bg-[#edebe9] mb-4 px-14 py-[10px] rounded-3xl font-sans font-semibold text-xs'>
                            Know More</button>
                    </div>
                </div>
                <div style={{ backgroundImage: 'url(https://www.starbucks.in/assets/images/guestLargeStar.png)' }}
                    className='relative bg-white bg-no-repeat bg-center rounded-full w-60 h-60'>
                    <div className='top-[55%] left-[48%] absolute w-14'>
                        <img src={Data.IconImg} alt="" loading='lazy' />
                    </div>
                </div>
            </div>
            <img className='relative -top-10 w-32' src="https://www.starbucks.in/assets/images/guest-bg-star-right.png" alt="" loading='lazy' />

        </section>
    )
}

export default Reward