import React from 'react'
import { Helmet } from 'react-helmet-async'
import SearchInput from '../Components/Navbar/SearchInput'
import ErrorPopup from './Orders/ErrorPopup'

const Store = () => {
    return (
        <main>
            <Helmet>
                <title>Store | Tata StarBucks</title>
            </Helmet>
            <div className='m-auto px-10 py-2 max-w-[1300px] text-slate-700 text-sm'>{'Home > Find A Store'}</div>

            <section className='flex m-auto max-w-[1280px]'>
                <aside className='flex flex-col items-center gap-5 w-[35%]'>
                    <div className='bg-[#1e3932] mb-14 p-5 w-full'>
                        <SearchInput placeholder="Find a store near you" />
                    </div>
                    <img src="https://www.starbucks.in/assets/images/gpsOff.svg" loading='lazy' alt="" />
                    <div className='flex flex-col items-center gap-2 mb-4'>
                        <h1 className='font-bold'>Sorry! we can't seem to spot you.</h1>
                        <p className='opacity-60 font-[Rubik] font-light text-[#000000DE] text-sm'>Please enable your location to find the nearest Starbucks</p>
                    </div>

                    <button className='border-[#00754A] border-[1px] px-10 py-3 rounded-3xl w-[80%] font-bold text-[#00754A] text-xs'>Enter Location Manually</button>
                </aside>
                <aside className='flex justify-center items-start bg-[#f9f9f9] shadow-5xl p-3 w-[65%] h-screen'>
                    <ErrorPopup
                        parentClass='flex items-start gap-3 bg-[#efd4dc] p-3 rounded-xl w-96'
                        fontSize={12}
                        header="No nearby store found."
                        para="Oh no! We couldn’t find any store around the provided location. Please enter a different location to get nearby stores." />
                </aside>
            </section>
        </main>
    )
}

export default Store