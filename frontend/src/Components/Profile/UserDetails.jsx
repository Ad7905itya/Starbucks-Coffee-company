import React from 'react'

const UserDetails = ({children ,image}) => {
    return (
        <div className='flex justify-between items-center m-auto pt-4 pb-5 border-b-2 max-w-[800px] lg:max-w-[900px] cursor-pointer'>
            <div className='flex items-center gap-2 py-2'>
                <img loading='lazy' src={image} alt="" />
                <h1 className='font-[Rubik] font-medium text-[#505152] text-lg uppercase'>{children}</h1>
            </div>
            <img loading='lazy' src="https://www.starbucks.in/assets/icon/arrow_right.svg" alt="" />
        </div>
    )
}

export default UserDetails