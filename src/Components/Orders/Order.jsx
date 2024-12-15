import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import LoginInput from '../LoginPage/LoginInput'
import ErrorPopup from './ErrorPopup'
import { DineIn_Takeaway as Dine } from '../../Data/DineIn_Takeaway'
import DineInBtn from './DineInBtn'
import { useLocalStorage } from '../../Hooks/useLocalStorage'


const Order = () => {
    const [IsActive, setIsActive] = useLocalStorage('DineBtn', {
        firstBtn: false,
        SecondBtn: false
    });

    const onClick1 = () => {
        if (!IsActive.firstBtn) {
            setIsActive(prev => ({ ...prev, firstBtn: true, SecondBtn: false }));
        }
    }
    const onClick2 = () => {
        if (IsActive.firstBtn) {
            setIsActive(prev => ({ ...prev, firstBtn: false, SecondBtn: true }));
        }
    }
    return (
        <main>
            <Helmet>
                <title>Menu | Tata StarBucks</title>
            </Helmet>
            <div className='m-auto px-8 py-2 max-w-[1300px] text-slate-700 text-sm'>{'Home > Order'}</div>
            <section className='bg-[#1e3932]'>
                <div className='flex justify-between items-start m-auto py-6 max-w-[1280px]'>
                    <div>
                        <div className='flex justify-between items-center gap-2 pb-3 text-white'>
                            <img className='w-5' src="https://www.starbucks.in/assets/icon/Location%20icon%203.svg" loading='lazy' alt="" />
                            <div className='w-80'>
                                <LoginInput
                                    ParentClass="m-0"
                                    color="#1e3932"
                                    placeholder="No Store Selected" />
                            </div>
                            <p className='flex items-center gap-1'><img src="https://www.starbucks.in/assets/icon/clock.svg" loading='lazy' alt="" />
                                <span className='font-[Rubik] text-sm'>{(IsActive.firstBtn || IsActive.SecondBtn) ? '00' : ""}mins</span></p>
                        </div>
                        <ErrorPopup
                            parentClass='flex items-start justify-between gap-3 bg-[#efd4dc] py-2 px-4  rounded-lg'
                            fontSize={11}
                            mt={-10}
                            header="No store found!"
                            para="Please enter a different location to find the nearest Starbucks."
                        />
                    </div>

                    <div className='flex rounded-xl'>
                        <button onClick={onClick1}>
                            <DineInBtn
                                className={`flex items-center gap-2 border-[1px] border-[rgba(255,255,255,0.5)] py-3 pl-8 rounded-l-lg w-52 font-[Rubik] ${!IsActive.firstBtn ? 'text-white' : 'text-black bg-white'}`}
                                image={!IsActive.firstBtn ? Dine[0].image1 : Dine[0].image2}
                                title={Dine[0].text}
                            />
                        </button>
                        <button onClick={onClick2}>
                            <DineInBtn
                                className={`flex items-center gap-2 border-[1px] border-[rgba(255,255,255,0.5)] py-3 pl-8 rounded-r-lg w-52 font-[Rubik] ${!IsActive.SecondBtn ? 'text-white' : 'text-black bg-white'}`}
                                image={!IsActive.SecondBtn ? Dine[1].image1 : Dine[1].image2}
                                title={Dine[1].text}
                            />
                        </button>
                    </div>
                </div>
            </section>
            <section className='py-5'>
                <div className='flex flex-col justify-center items-center gap-2 bg-white py-5'>
                    <img src="https://www.starbucks.in/assets/icon/no-menu-found.svg" loading='lazy' alt="" />
                    <h2 className='font-bold text-lg'>No menu found!</h2>
                    <p className='font-[Rubik] font-thin text-[rgba(0,0,0,0.6)] text-sm tracking-wider'>Please try after some time.</p>
                </div>
                <div className='bg-[#f9f9f9]'>
                    <div className='flex items-center gap-2 m-auto py-6 max-w-[1280px]'>
                        <img src="https://www.starbucks.in/assets/icon/info.png" loading='lazy' alt="" />
                        <div className='flex flex-col justify-between gap-5 font-[Rubik] text-[11px] text-[rgba(0,0,0,0.6)]'>
                            <p className='tracking-wider'>An average active adult requires 2,000 kcal energy per day, however, calorie needs may vary.</p>
                            <p>FSSAI License No.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Order