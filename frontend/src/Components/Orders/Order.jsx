import BreadcrumbNav from '../BreadcrumbNav';
import React, { Suspense, useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../Hooks/useAuth'
import { useLocalStorage } from '../../Hooks/useLocalStorage'
import NavBarGift from '../GiftComponents/NavBarGift'
import OrderNavbar from './OrderNavbar'
import { useLocation } from 'react-router-dom'
import CardsSection from './CardsSection'
import ShimmerCardEffect from './SimmerCard/ShimmerCardEffect'
import NotFoundCards from './NotFoundCards'
import SlideBar from './SlideBar'
import { ContextCartLists } from '../../contexts/CartItemsContext'
import { useDispatch, useSelector } from 'react-redux'
import { setActive } from '../../store/Slices/ActiveFilter'
import { fetchData, fetchHandCraftData } from '../../Hooks/handcraftCurations'

const Order = () => {
    const path = useLocation().state
    const { ProductCart } = useContext(ContextCartLists);
    const Product = useSelector(state => state.Active);
    const Dispatch = useDispatch();
    const { user, guest } = useAuth();
    const [cartDetail] = useLocalStorage('cartDetail', {});
    const [IsActive, setIsActive] = useLocalStorage('DineBtn', {
        firstBtn: false,
        SecondBtn: false
    });

    const [handCraft, setHandCraft] = useState(null);
    const [dine, setDine] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await fetchHandCraftData();
            setHandCraft(data);
            const dineData = await fetchData('dine-in-takeaway');
            setDine(dineData);
        })();
    }, []);

    useEffect(() => {
        if (handCraft?.data?.length && !Product.Active) {
            Dispatch(setActive(handCraft.data[0].name));
        }
    }, [handCraft, Product.Active, Dispatch]);

    if (!handCraft || dine.length < 2) return null;

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
                <BreadcrumbNav items={[
                    { label: 'Home', path: '/' },
                    { label: 'Order' }
                ]} />
                <OrderNavbar
                    Dine={dine}
                    IsActive={IsActive}
                    onClick1={onClick1}
                    onClick2={onClick2} />
                {user || guest ?
                    <>
                        <section className='bg-[#edebe9]'>
                            <div className='flex justify-between items-center m-auto max-w-[800px] lg:max-w-[1260px] h-14 overflow-hidden'>
                                <div className='flex items-center h-full overflow-x-auto'>
                                    <div className='flex items-center h-full'>
                                        {handCraft.data.map(({ _id, name, images }) => {
                                            return (
                                                <NavBarGift
                                                    key={_id}
                                                    active={Product.Active === name ? "active-2 gift" : "opacity-50"}
                                                    onHandler={(e) => Dispatch(setActive(e.target.innerText))} >{name}</NavBarGift>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            {handCraft.data.length ?
                                handCraft.data.filter((item) => item.name === Product.Active).map((item, i) => <CardsSection key={i} CategoryData={item} />) :
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