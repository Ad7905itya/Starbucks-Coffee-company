import React from 'react'

const BannerSection = ({ Banner }) => {
    return (
        <div className='flex items-center mx-3 h-full'>
            <div style={{backgroundImage: `url(${Banner.image})`}} className={`bg-cover bg-no-repeat bg-center shadow-4xl rounded-xl w-full h-[90%] flex items-center relative cursor-pointer`}>
                <img className='mx-2 w-[100px]' src={Banner.subImage} alt={Banner.title} />
                <div className='flex flex-col items-start gap-5 mt-8 ml-3 text-white self-start'>
                    <p className='text-xs'>{Banner.subTitle}</p>
                    <h2>{Banner.title}</h2>
                    <p className='text-base text-start'>{Banner.description}</p>
                </div>
                <div className={`absolute right-5 bottom-2 flex items-end  w-44 h-full`}>
                    <button className='bg-white mb-4 px-5 py-3 rounded-3xl w-32 text-sm'>{Banner.btnText}</button>
                </div>
                <div className='-right-8 absolute w-36 h-full'>
                    <p className='p-2 text-[10px] text-white'>{Banner.status}</p>
                </div>
            </div>
        </div>
    )
}

export default BannerSection