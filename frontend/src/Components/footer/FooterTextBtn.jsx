import React from 'react'

const FooterTextBtn = ({TextBtn}) => {
    return (
        <div className='flex flex-col gap-8 text-slate-200 text-xs lg:text-sm'>
            
            <p className="hover:text-[#a2a2a2] transition-all cursor-pointer">{TextBtn}</p>
        </div>
    )
}

export default FooterTextBtn