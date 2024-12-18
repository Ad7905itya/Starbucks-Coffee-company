import React from 'react'
import FooterTextBtn from './FooterTextBtn';

const FooterHeader = ({ Text }) => {
    return (
        <div className='flex flex-col gap-2 w-full max-w-[150px] text-white'>
            <h1 className='font-bold lg:text-xl cursor-pointer'>{Text.footerHeader}</h1>
            <div className='flex flex-col gap-8 text-slate-200 text-sm'>
                {Text.Data.map((item, i) => <FooterTextBtn key={i} TextBtn={item} />)}
            </div>
        </div>
    )
}

export default FooterHeader