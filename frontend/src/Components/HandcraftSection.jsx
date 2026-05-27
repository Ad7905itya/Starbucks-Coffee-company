import React from 'react'
import { Link } from 'react-router-dom'

const HandcraftSection = ({ image, title }) => {
    return (
        <Link to={'/ordering'} state={{ title }}>
            <div className='flex flex-col items-center gap-2 lg:gap-1 font-medium text-sm'>
                <div className='border-green-700 hover:border-2 rounded-full w-24 lg:w-28 h-24 lg:h-28 overflow-hidden'>
                    <img src={image} alt="" loading='lazy' />
                </div>
                <h1>{title}</h1>
            </div>
        </Link>
    )
}

export default HandcraftSection