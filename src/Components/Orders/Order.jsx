import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { DineIn_Takeaway as Dine } from '../../Data/DineIn_Takeaway'
import { useLocalStorage } from '../../Hooks/useLocalStorage'
import NavBarGift from '../GiftComponents/NavBarGift'
import OrderNavbar from './OrderNavbar'
import { useLocation } from 'react-router-dom'
import { Handcraft } from '../../Data/HandcraftCurations'
import CardsSection from './CardsSection'
import Filters from './Filters'


const Order = () => {
    const path = useLocation().state
    const [Active, setActive] = useState(Handcraft.map((item) => item.mainCategory)[0]);
    const [isUserLogin, setIsUserLogin] = useLocalStorage('User', {});
    const [IsActive, setIsActive] = useLocalStorage('DineBtn', {
        firstBtn: false,
        SecondBtn: false
    });

    useEffect(() => {
        if (path) {
            setActive(path.title)
        }
    }, [])

    const handleClick = (e) => {
        const input = e.target.value
        setActive(input);
    }

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
        <main className={`md:static relative -top-[100px] lg:top-0 w-full`}>
            <Helmet>
                <title>Menu | Tata StarBucks</title>
            </Helmet>
            <div className='lg:block hidden m-auto px-8 py-2 max-w-[1300px] text-slate-700 text-sm'>{'Home > Order'}</div>
            <OrderNavbar
                Dine={Dine}
                IsActive={IsActive}
                onClick1={onClick1}
                onClick2={onClick2} />
            {Object.keys(isUserLogin).length ?
                <>
                    <section className='bg-[#edebe9]'>
                        <div className='flex justify-between items-center m-auto max-w-[800px] lg:max-w-[1260px] h-14 overflow-hidden'>
                            <div className='flex items-center h-full overflow-x-auto'>
                                <div className='flex items-center h-full'>
                                    {Handcraft.map((item, i) => {
                                        return (
                                            <NavBarGift
                                                key={i}
                                                active={Active === item.mainCategory ? "active-2" : "opacity-50"}
                                                onHandler={handleClick} >{item.mainCategory}</NavBarGift>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        {Handcraft.filter((item) => item.mainCategory === Active).map((item, i) => <CardsSection key={i} CategoryData={item} />)}
                    </section>
                </>
                : <section className='py-5'>
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
                </section>}
        </main>
    )
}

export default Order