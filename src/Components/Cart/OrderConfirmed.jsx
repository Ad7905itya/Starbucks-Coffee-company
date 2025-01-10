import React, { useState } from 'react'
import CartTable from './CartTable';

const OrderConfirmed = ({ ProductCart, Total, Open, setProductCart }) => {
    const [Effect, setEffect] = useState(false);

    const HandlerOrder = () => {
        setEffect(true);

        setTimeout(() => {
            setProductCart([]);
            setEffect(false);
        }, 5000)
    }
    return (
        <section className='m-auto mt-2 px-2 pt-6 w-full'>
            <div className='flex items-center gap-2 px-8 pb-6 font-bold text-3xl'>
                <h1>Confirm Order</h1>
                <img src="../check.jpg" loading='lazy' width={32} alt="check" /></div>
            <div className='flex flex-col gap-5 mb-5 px-8'>
                {ProductCart.map((item, i) => <CartTable key={i} state={item} open={Open} />)}
            </div>
            <div className='flex justify-between px-10 py-2 rounded-xl font-bold text-xl'>
                <p >Total</p>
                <p >₹ {(Total().toFixed(2))}</p>
            </div>
            <div className='flex justify-center px-8 pb-5'>
                <button
                    onClick={HandlerOrder}
                    className={`bg-[#00754a] ${Effect ? 'animate-pulse py-6': ''} hover:bg-[#1e3932] mt-6 px-6 py-4 rounded-3xl w-full font-bold text-white text-xs`}>
                    {Effect ? '' : 'Order Confirmed'}</button>
            </div>
        </section>
    )
}

export default OrderConfirmed