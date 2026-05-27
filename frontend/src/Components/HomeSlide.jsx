import React from 'react'
import { Link } from 'react-router-dom';

const HomeSlide = ({ pages, onClick, BtnName, cart }) => {
    return (
        <div className='flex flex-col justify-between bg-[#006241] shadow-4xl pt-3 w-full'>

            <Link to={`/${pages}`}>
                <div className='flex justify-between items-center m-auto px-4 w-full max-w-[800px] lg:max-w-[1260px] h-full'>
                    <div className='flex flex-col gap-1 px-4 py-3 text-white'>
                        <h1 className='text-[#e1e1e1] text-sm'>{cart.ProductCartCount == 1 ? cart.name : cart.name + `... +${cart.ProductCartCount - 1} More`}</h1>
                        <p className='font-bold text-xs'>₹ {(cart.price)?.toFixed(2)}</p>
                    </div>
                    <button onClick={onClick} className='bg-white px-5 py-2 rounded-3xl w-full max-w-[180px] font-bold text-[#000000c9] text-sm'>{BtnName}</button>
                </div>
            </Link>
        </div>
    )
}

export default HomeSlide