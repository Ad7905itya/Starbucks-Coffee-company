import React from 'react'
import { CgClose } from 'react-icons/cg'

const ErrorPopup = ({ header, para, parentClass, fontSize, mt }) => {
    return (
        <div className={parentClass}>
            <img className='w-8' src="https://www.starbucks.in/assets/icon/searchresult@2x.png" alt="" loading='lazy' />
            <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-[#d62b1f]'>{header}</h1>
                <p style={{fontSize: fontSize,marginTop: mt}} className='opacity-75 font-[Rubik] font-thin leading-5'>{para}</p>
            </div>
            <div> <CgClose size={14} color='#d62b1f' /></div>
        </div>
    )
}

export default ErrorPopup