import React from 'react'

const Filters = ({ onClick, Data }) => {
    return (
        <div className='cursor-pointer'>
            <h1 onClick={onClick} className='bg-[#ebebeb] opacity-65 px-5 py-[5px] rounded-md text-xs hover:text-[#00804c]'>{Data}</h1>
        </div>
    )
}

export default Filters