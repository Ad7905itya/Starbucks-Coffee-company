import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { GiftCardData } from '../Data/GiftCardData'
const Footer = React.lazy(() => import('./footer/Footer'));
const NavBarGift = React.lazy(() => import('./GiftComponents/NavBarGift'));
const GiftCard = React.lazy(() => import('./GiftComponents/GiftCard'));

const Gift = () => {
    const [Active, setActive] = useState('1');
    const [CategorySelection, setCategorySelection] = useState('Featured');

    const handleClick = (e) => {
        setActive(e.target.id);
        setCategorySelection(e.target.value);
    }

    return (
        <main>
            <Helmet>
                <title>Gift Cards | Tata StarBucks</title>
            </Helmet>
            <div className='lg:block hidden m-auto px-10 py-2 max-w-[1320px] text-slate-700 text-sm'>{'Home > Gift Cards'}</div>
            <section className='lg:block hidden bg-[#1e3932] px-5 h-12 font-[sans-serif] text-white cursor-pointer'>
            </section>
            <section className='relative -top-6 lg:top-0 bg-[#edebe9]'>
                <div className='flex justify-between items-center m-auto max-w-[800px] lg:max-w-[1260px] h-14'>
                    <div className='flex items-center h-full'>
                        <img className='w-16 h-16' src="https://www.starbucks.in/assets/icon/left-icon.svg" alt="left" loading='lazy' />
                        <div className='flex items-center h-full'>
                            <NavBarGift onHandler={handleClick} id={'1'} active={Active === "1" ? "active-2" : ""}>Featured</NavBarGift>
                            <NavBarGift onHandler={handleClick} id={'2'} active={Active === "2" ? "active-2" : ""}>AnyTime</NavBarGift>
                            <NavBarGift onHandler={handleClick} id={'3'} active={Active === "3" ? "active-2" : ""}>Congratulations</NavBarGift>
                            <NavBarGift onHandler={handleClick} id={'4'} active={Active === "4" ? "active-2" : ""}>Thank You</NavBarGift>
                        </div>
                    </div>
                    <img className='w-16 h-16' src="https://www.starbucks.in/assets/icon/right-icon.svg" alt="right" loading='lazy' />
                </div>
            </section>
            <section className='min-h-52 overflow-hidden'>
                <div className='border-gray-400 px-8 border-b-[1px]'>
                    <div className='m-auto max-w-[800px] lg:max-w-[1240px]'>
                        <h1 className='py-2 font-bold text-2xl'>{CategorySelection === "Featured" ? "AnyTime" : CategorySelection}</h1>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='gap-16 lg:gap-12 grid grid-cols-2 lg:grid-cols-3 m-auto mt-8 mb-20 px-6 lg:px-8 max-w-[800px] lg:max-w-[1240px]'>
                        {
                            CategorySelection === "Featured" ?
                                GiftCardData.filter((Item) => Item.Feature && Item.category === "Anytime").map((Item, i) =>
                                    <GiftCard data={Item} image={Item.BannerImg} title={Item.title} description={Item.description} key={i} />


                                )
                                : GiftCardData.filter((Item) => Item.category.toLowerCase() === CategorySelection.toLowerCase()).map((Item, i) =>
                                    <GiftCard data={Item} image={Item.BannerImg} title={Item.title} description={Item.description} key={i} />
                                )
                        }
                    </div>
                </div>
                {CategorySelection === "Featured" ?
                    <>
                        <div className='border-gray-400 px-8 border-b-[1px]'>
                            <div className='m-auto max-w-[800px] lg:max-w-[1240px]'>
                                <h1 className='py-2 font-bold text-2xl'>Congratulations</h1>
                            </div>
                        </div>
                        <div className='gap-14 grid grid-cols-2 lg:grid-cols-3 m-auto mt-8 mb-20 px-6 lg:px-8 max-w-[800px] lg:max-w-[1240px]'>
                            {GiftCardData.filter((Item) => Item.Feature && Item.category === "Congratulations").map((Item, i) =>
                                <GiftCard data={Item} image={Item.BannerImg} title={Item.title} description={Item.description} key={i} />)}
                        </div>
                    </> : ""}
            </section>
            <Footer />
        </main>
    )
}

export default Gift