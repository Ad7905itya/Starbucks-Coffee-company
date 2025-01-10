import React from 'react'
import { Link } from 'react-router-dom'

const BannerSection = ({ Banner }) => {
    return (
        <div className='flex items-center mx-3 h-full'>
            <div style={{ backgroundImage: `url(${Banner.image})` }} className={`bg-cover bg-no-repeat bg-center shadow-4xl rounded-xl w-full h-[90%] flex items-center relative cursor-pointer`}>
                <img className='mx-2 w-[80px] lg:w-[100px]' src={Banner.subImage} alt={Banner.title} />
                <div className='flex flex-col items-start gap-3 mt-8 ml-3 text-white self-start'>
                    <p className='text-xs'>{Banner.subTitle}</p>
                    <h2 className='text-sm lg:text-lg'>{Banner.title}</h2>
                    <p className='text-start text-xs lg:text-base'>{Banner.description}</p>
                </div>
                <div className={`absolute right-5 bottom-2 flex items-end  w-44 h-full`}>
                    {Banner.btnText !== "Know More" ?
                        <Link to={'/ordering'} state={{title: 'Drinks'}}>
                            <button className='bg-white mb-4 ml-5 lg:ml-0 px-8 lg:px-14 py-2 lg:py-4 rounded-3xl font-sans font-semibold text-[10px] lg:text-xs'>{Banner.btnText}</button>
                        </Link> : <Link to={'/banner-detail'}>
                            <p className='bg-white mb-4 ml-5 lg:ml-0 px-8 lg:px-14 py-2 lg:py-4 rounded-3xl font-sans font-semibold text-[10px] lg:text-xs'>{Banner.btnText}</p>
                        </Link>}
                </div>
                <div className='top-0 -right-8 absolute w-36'>
                    <p className='p-2 text-[8px] text-white lg:text-[10px]'>{Banner.status}</p>
                </div>
            </div>
        </div>
    )
}

export default BannerSection