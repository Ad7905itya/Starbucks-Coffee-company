import React from 'react'
import { Helmet } from 'react-helmet-async'

const Store = () => {
    return (
        <main>
            <Helmet>
                <title>Store | Tata StarBucks</title>
            </Helmet>
            <div className='max-w-[1440px] m-auto px-10 py-2 text-slate-700 '>{'Home > Find A Store'}</div>
        </main>
    )
}

export default Store