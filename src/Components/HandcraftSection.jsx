import React from 'react'

const HandcraftSection = ({ image, title }) => {
    return (
        <div className='flex flex-col items-center gap-1 font-medium text-sm'>
            <div className='border-green-700 hover:border-2 rounded-full w-28 h-28 overflow-hidden'>
                <img src={image} alt="" loading='lazy' />
            </div>
            <h1>{title}</h1>
        </div>
    )
}

export default HandcraftSection