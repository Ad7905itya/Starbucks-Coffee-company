import React from 'react'

const ModalData = ({ title, img }) => {
    return (
        <div className='flex items-center gap-1 font-medium text-xs'>
            <img className='flex-shrink-0 w-3 h-3' src={img} loading='lazy' alt={title} />
            <span className='uppercase'>{title}</span></div>
    )
}

export default ModalData