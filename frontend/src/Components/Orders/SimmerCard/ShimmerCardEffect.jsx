import React from 'react'
import ShimmerCards from './ShimmerCards'

const ShimmerCardEffect = () => {
    return (
        <section className='p-6 pt-10'>
            <aside className='flex flex-col gap-2 m-auto w-full max-w-[1240px]'>
                <div className='bg-[#ccc] rounded-lg w-[15%] min-h-8 animate-pulse from from'></div>
                <div className='bg-[#ccc] rounded-lg w-[30%] min-h-8 animate-pulse from from'></div>
            </aside>

            <aside className='flex px-8 py-10'>
                <div className='gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-auto px-5 w-full max-w-[1300px]'>
                    {(new Array(12).fill('').map((item, i) => <ShimmerCards key={i} />))}
                </div>
            </aside>
        </section>
    )
}

export default ShimmerCardEffect