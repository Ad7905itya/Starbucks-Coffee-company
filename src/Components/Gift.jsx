import React from 'react'
import { Helmet } from 'react-helmet-async'

const Gift = () => {
    return (
        <main>
            <Helmet>
                <title>Gift Cards | Tata StarBucks</title>
            </Helmet>
            <div className='m-auto px-10 py-2 max-w-[1440px] text-slate-700'>{'Home > Gift Cards'}</div>
        </main>
    )
}

export default Gift