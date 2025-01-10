import React from 'react'
import { Link } from 'react-router-dom'

const SlideBar = ({ state, cart, BtnName, onClick, pages }) => {

    return (
        <section className='flex flex-col justify-between bg-[#00754a] shadow-4xl pt-3 w-full'>

            {state && <div className='flex justify-between items-center m-auto px-4 py-2 rounded-t-2xl w-full max-w-[800px] lg:max-w-[1240px] h-full'>
                <div className='flex flex-col items-start font-[Rubik] font-medium text-[14px] text-white'>
                    <span className='text-[#c4c4c4]'>Current item</span>
                    <span>{state.name}</span>
                </div>
                <span className='font-bold text-white'>₹ {(state.basePrice).toFixed(2)}</span>
            </div>}

            {cart && <div className='flex justify-between items-center m-auto px-4 py-1 w-full max-w-[800px] lg:max-w-[1240px] h-full cursor-pointer'>
                <div className='flex flex-col items-start font-[Rubik] font-medium text-[14px] text-white'>
                    <span className='text-[#c4c4c4] text-[10px] uppercase'>{cart.ProductCartCount} item added</span>
                    <span className='tracking-wider'>{cart.ProductCartCount == 1 ? cart.name : cart.name + `... +${cart.ProductCartCount - 1} More`}</span>
                </div>
                <span className='font-bold text-white'>₹ {(cart.price)?.toFixed(2)}</span>
            </div>}

            <div className='bg-[#006241] py-4 w-full'>
                {pages ? <Link to={`/${pages}`}>
                    <div className='flex justify-end m-auto px-4 w-full max-w-[800px] lg:max-w-[1260px] h-full'>
                        <button onClick={onClick} className='bg-white px-5 py-2 rounded-3xl w-full max-w-[180px] font-bold text-[#000000c9] text-sm'>{BtnName}</button>
                    </div>
                </Link> : <div className='flex justify-end m-auto px-4 w-full max-w-[800px] lg:max-w-[1260px] h-full'>
                    <button onClick={onClick} className='bg-white px-5 py-2 rounded-3xl w-full max-w-[180px] font-bold text-[#000000c9] text-sm'>{BtnName}</button>
                </div>}
            </div>
        </section>
    )
}

export default SlideBar