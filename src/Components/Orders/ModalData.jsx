import React from 'react'

const ModalData = ({ grainData }) => {
    return (
        <div className='flex items-center gap-1 font-medium text-xs'>
            <img className='flex-shrink-0 w-3 h-3' src={grainData.img} loading='lazy' alt={grainData.grain} />
            <span>{grainData.grain}</span></div>
    )
}

export default ModalData