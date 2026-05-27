import React from 'react'

const DineInBtn = ({ image, title, className }) => {
    return (
        <div className={className}>
            <img src={image} loading='lazy' alt="" />
            <h2 className='text-xs'>{title}</h2>
        </div>
    )
}

export default DineInBtn