import React, { useState } from 'react'
import DineInBtn from './DineInBtn'
import ErrorPopup from './ErrorPopup'
import LoginInput from '../LoginPage/LoginInput'

const OrderNavbar = ({ IsActive, onClick1, onClick2, Dine }) => {
    const [Open, setOpen] = useState(true);

    const onClick = () => {
        setOpen(false);
    }
    return (
        <section className='bg-[#1e3932] py-2'>
            <div className='flex md:flex-row flex-col md:justify-between items-center md:items-start gap-10 md:gap-5 m-auto px-8 pt-5 pb-4 w-full max-w-[900px] lg:max-w-[1280px]'>
                <div className='flex justify-start lg:justify-between items-center gap-2 pb-3 w-full max-w-[420px] text-white'>
                    <img className='w-5' src="https://www.starbucks.in/assets/icon/Location%20icon%203.svg" loading='lazy' alt="" />
                    <div className='w-full'>
                        <LoginInput
                            myValue=""
                            Header=""
                            onChange={(e) => e.target.value}
                            id="search"
                            ParentClass="m-0"
                            color="#1e3932"
                            placeholder="No Store Selected" />
                    </div>
                    <p className='flex items-center gap-1'><img src="https://www.starbucks.in/assets/icon/clock.svg" loading='lazy' alt="" />
                        <span className='font-[Rubik] text-sm'>{(IsActive.firstBtn || IsActive.SecondBtn) ? '00' : ""}mins</span></p>
                </div>
                <div className='flex justify-center md:justify-end rounded-xl w-full'>
                    <button onClick={onClick1}>
                        <DineInBtn
                            className={`flex items-center gap-2 border-[1px] border-[rgba(255,255,255,0.5)] py-3 pl-8 rounded-l-lg w-44 md:w-32 lg:w-44 font-[Rubik] ${!IsActive.firstBtn ? 'text-white' : 'text-black bg-white'}`}
                            image={!IsActive.firstBtn ? Dine[0].image1 : Dine[0].image2}
                            title={Dine[0].text}
                        />
                    </button>
                    <button onClick={onClick2}>
                        <DineInBtn
                            className={`flex items-center gap-2 border-[1px] border-[rgba(255,255,255,0.5)] py-3 pl-8 rounded-r-lg w-44 md:w-32 lg:w-44 font-[Rubik] ${!IsActive.SecondBtn ? 'text-white' : 'text-black bg-white'}`}
                            image={!IsActive.SecondBtn ? Dine[1].image1 : Dine[1].image2}
                            title={Dine[1].text}
                        />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default OrderNavbar