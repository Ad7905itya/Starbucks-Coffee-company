import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import NavbarSection from './NavbarSection';
import GiftCards from './GiftCards';
import { fetchData } from '../../Hooks/handcraftCurations';
import BreadcrumbNav from '../BreadcrumbNav';
const Footer = React.lazy(() => import('../footer/Footer'));

const Gift = () => {
    const GiftCardData = ['Featured', 'Anytime', 'Congratulations', 'Thank You'];
    const [Active, setActive] = useState('Featured');
    const [GiftCard, setGiftCard] = useState([])

    useEffect(() => {
        fetchData('giftcards').then(setGiftCard);
    }, [])

    const handleClick = (e) => {
        setActive(e.target.value);
    }

    return (
        <main>
            <Helmet>
                <title>Gift Cards | Tata StarBucks</title>
            </Helmet>
            <BreadcrumbNav items={[
                { label: 'Home', path: '/' },
                { label: 'Gift Cards' }
            ]} />
            <section className='hidden lg:block bg-[#1e3932] px-5 h-12 font-[sans-serif] text-white cursor-pointer'>
            </section>
            <section className='-top-3 lg:top-0 relative bg-[#edebe9]'>
                <div className='flex justify-between items-center m-auto max-w-[800px] lg:max-w-[1260px] h-14'>
                    <img className='w-16 h-16' src="https://www.starbucks.in/assets/icon/left-icon.svg" alt="left" loading='lazy' />
                    <div className='flex items-center h-full overflow-x-auto uppercase'>
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
                <div className='px-8 border-gray-400 border-b-[1px]'>
                    <div className='m-auto max-w-[800px] lg:max-w-[1240px]'>
                        <h1 className='py-2 font-bold text-2xl'>{Active === "Featured" ? "Anytime" : Active}</h1>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='flex flex-col gap-16 lg:gap-12 md:grid md:grid-cols-2 lg:grid-cols-3 m-auto mt-8 mb-20 px-6 lg:px-8 max-w-[800px] lg:max-w-[1240px]'>
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
                        <div className='px-8 border-gray-400 border-b-[1px]'>
                            <div className='m-auto max-w-[800px] lg:max-w-[1240px]'>
                                <h1 className='py-2 font-bold text-2xl'>Congratulations</h1>
                            </div>
                        </div>
                        <div className='flex flex-col items-center gap-16 lg:gap-1 md:grid md:grid-cols-2 lg:grid-cols-3 m-auto mt-8 mb-20 px-6 lg:px-8 max-w-[800px] lg:max-w-[1240px]'>
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