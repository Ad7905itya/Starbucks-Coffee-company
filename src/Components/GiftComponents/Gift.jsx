import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import NavbarSection from './NavbarSection';
import GiftCards from './GiftCards';
const Footer = React.lazy(() => import('../footer/Footer'));

const Gift = () => {
    const GiftCardData = ['Featured', 'Anytime', 'Congratulations', 'Thank You'];
    const [Active, setActive] = useState('Featured');
    const [GiftCard, setGiftCard] = useState([])

    useEffect(() => {
        import('../../Data/GiftCardData').then((data) => {
            setGiftCard(data.GiftCardData);
        })
    }, [])

    const handleClick = (e) => {
        setActive(e.target.value);
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
                    <div className='flex items-center h-full uppercase'>
                        <img className='w-16 h-16' src="https://www.starbucks.in/assets/icon/left-icon.svg" alt="left" loading='lazy' />
                        <NavbarSection
                            style={{ backgroundImage: 'url(https://www.starbucks.in/media/lineSeparator1-NQWR4CXV.png)' }}
                            Active={Active}
                            handleClick={handleClick}
                            item={GiftCardData} />

                    </div>
                    <img className='w-16 h-16' src="https://www.starbucks.in/assets/icon/right-icon.svg" alt="right" loading='lazy' />
                </div>
            </section>
            <section className='min-h-52 overflow-hidden'>
                <div className='border-gray-400 px-8 border-b-[1px]'>
                    <div className='m-auto max-w-[800px] lg:max-w-[1240px]'>
                        <h1 className='py-2 font-bold text-2xl'>{Active === "Featured" ? "Anytime" : Active}</h1>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='gap-16 lg:gap-12 grid grid-cols-2 lg:grid-cols-3 m-auto mt-8 mb-20 px-6 lg:px-8 max-w-[800px] lg:max-w-[1240px]'>
                        {(Active === "Featured" ?
                            (GiftCard.length ? GiftCard.filter((Item) => Item.Feature && Item.category === 'Anytime').map((Item, i) =>
                                <GiftCards key={i} {...Item} />
                            ) : <div>Loading...</div>)
                            : GiftCard.length ? GiftCard.filter((Item) => Item.category === Active).map((Item, i) =>
                                <GiftCards key={i} {...Item} />
                            ) : <div>Loading...</div>
                        )}
                    </div>
                </div>
                {Active === "Featured" ?
                    <>
                        <div className='border-gray-400 px-8 border-b-[1px]'>
                            <div className='m-auto max-w-[800px] lg:max-w-[1240px]'>
                                <h1 className='py-2 font-bold text-2xl'>Congratulations</h1>
                            </div>
                        </div>
                        <div className='gap-16 lg:gap-12 grid grid-cols-2 lg:grid-cols-3 m-auto mt-8 mb-20 px-6 lg:px-8 max-w-[750px] lg:max-w-[1240px]'>
                            {GiftCard.length ? GiftCard.filter((Item) => Item.Feature && Item.category === "Congratulations").map((Item, i) =>
                                <GiftCards key={i} {...Item} />) : <div>Loading...</div>}
                        </div>
                    </> : ""}
            </section>
            <Footer />
        </main>
    )
}

export default Gift