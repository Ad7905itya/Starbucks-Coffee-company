import BreadcrumbNav from '../BreadcrumbNav'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import PayCards from './PayCards'

const PaySection = () => {
    const [Active, setActive] = useState({ firstSec: false, secondSec: true });
    return (
        <main>
            <Helmet>
                <title>Payment | Tata StarBucks</title>
            </Helmet>
            <BreadcrumbNav items={[
                { label: 'Home', path: '/' },
                { label: 'Order' }
            ]} />
            <section className='bg-[#f9f9f9]'>
                <aside className='flex md:flex-row flex-col justify-between items-center mx-auto px-6 py-3 max-w-[800px] lg:max-w-[1280px]'>
                    <h1 className='font-bold text-[#1e3932]'>My Starbucks Cards</h1>
                    <div className='flex justify-between items-center gap-10 md:gap-2'>
                        <h1 className='font-bold text-[#00754a] text-sm'>My Starbucks Cards</h1>
                        <button className='bg-[#00754a] px-5 py-2 rounded-3xl text-white text-xs'>Add Card</button>
                    </div>
                </aside>
            </section>
            <PayCards Active={Active} />
        </main>
    )
}

export default PaySection