import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { DineIn_Takeaway as Dine } from '../../Data/DineIn_Takeaway'
import { useLocalStorage } from '../../Hooks/useLocalStorage'
import NavBarGift from '../GiftComponents/NavBarGift'
import OrderNavbar from './OrderNavbar'
import { Link, useLocation } from 'react-router-dom'
import { Handcraft } from '../../Data/HandcraftCurations'
import CardsSection from './CardsSection'
import ShimmerCardEffect from './SimmerCard/ShimmerCardEffect'
import NotFoundCards from './NotFoundCards'
import SlideBar from './SlideBar'
import { ContextCartLists } from '../../contexts/CartItemsContext'

const Order = () => {
    const path = useLocation().state
    const { ProductCart } = useContext(ContextCartLists);
    const [Active, setActive] = useState(Handcraft.map((item) => item.mainCategory)[0]);
    const [cartDetail, setCartDetail] = useLocalStorage('cartDetail', {});
    const [isUserLogin, setIsUserLogin] = useLocalStorage('User', {});
    const [IsActive, setIsActive] = useLocalStorage('DineBtn', {
        firstBtn: false,
        SecondBtn: false
    });

    const [handCraftData, setHandCraftData] = useState([]);

    useEffect(() => {
        if (path) {
            setActive(path.title)
        }
        import('../../Data/HandCraftData').then((data) => {
            setHandCraftData(data.HandCraftData);
        })
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
        <Suspense fallback={<div>Loading...</div>}>
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
                                                    active={Active === item.mainCategory ? "active-2 gift" : "opacity-50"}
                                                    onHandler={handleClick} >{item.mainCategory}</NavBarGift>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            {handCraftData.length ?
                                handCraftData.filter((item) => item.name === Active).map((item, i) => <CardsSection key={i} CategoryData={item} />) :
                                <ShimmerCardEffect />}
                        </section>

                        {ProductCart.length ? <section className='bottom-0 fixed w-full'>
                            <SlideBar
                                cart={cartDetail}
                                pages='ordering/cart'
                                BtnName='View Cart' />
                        </section> : ''}
                    </>
                    : <NotFoundCards />}
            </main>
        </Suspense>
    )
}

export default Order