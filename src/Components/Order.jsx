import React from 'react'
import { Helmet } from 'react-helmet-async'

const Order = () => {
    return (
        <main>
        <Helmet>
            <title>Menu | Tata StarBucks</title>
        </Helmet>
        <div className='max-w-[1440px] m-auto px-10 py-2 text-slate-700 '>Home {'>'} Order</div>
        </main>
    )
}

export default Order