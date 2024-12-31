import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import CartTable from './CartTable'
import { ContextCartLists } from '../../contexts/CartItemsContext'
import SlideBar from '../Orders/SlideBar'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../../Hooks/useLocalStorage'


const Cart = () => {
    const { ProductCart, Total, subTotalValue } = useContext(ContextCartLists);
    const [cartDetail, setCartDetail] = useLocalStorage('cartDetail', {});

    useEffect(() => {
        setCartDetail({
            name: ProductCart[0]?.ProductName,
            price: Total(),
            ProductCartCount: ProductCart.length
        })
    }, [ProductCart]);

    return (
        <main>
            <Helmet>
                <title>Cart | Tata StarBucks</title>
            </Helmet>
            <div className='lg:block hidden m-auto px-8 py-2 max-w-[1300px] text-slate-700 text-sm'>{`Home > Order > Your Cart`}</div>

            <section className='m-auto mt-8 px-8 pt-6 w-full max-w-[800px] lg:max-w-[1240px]'>
                <div className='flex flex-col gap-5'>
                    {ProductCart.map((item, i) => <CartTable key={i} state={item} />)}
                </div>
            </section>

            {ProductCart.length ?
                <>
                    <section className='m-auto px-8 py-5 w-full max-w-[800px] lg:max-w-[1240px]'>
                        <Link to={'/ordering'}><h1 className='text-[#01814d] text-sm underline cursor-pointer'>+ Add More Items</h1></Link>
                    </section>
                    <section className='m-auto px-8 py-5 w-full max-w-[800px] lg:max-w-[1240px]'>
                        <div className='flex gap-2'>
                            <img src="https://www.starbucks.in/assets/icon/list.svg" loading='lazy' alt="" />
                            <h1 className='font-[Rubik] text-[#000000de] text-sm'>ANY OTHER REQUEST?</h1>
                        </div>

                        <textarea
                            className='border-2 mt-5 px-5 py-2 rounded-xl w-full h-40 min-h-12 outline-none' name="comment"
                            id="comment"
                            placeholder='Have something specific in mind? Write it down and we’ll let our baristas know.'>
                        </textarea>
                    </section>

                    <section className='bg-[#f2f0eb] mt-8 mb-5'>
                        <aside className='m-auto px-8 py-5 w-full max-w-[800px] lg:max-w-[1200px] font-[Rubik]'>
                            <h1 className='py-4 font-bold'>BILL DETAIL</h1>
                            <div className='flex justify-between mx-auto mt-2 text-[#00000094]'>
                                <p>Sub Total</p>
                                <p>₹ {(subTotalValue(Total()).subtotal).toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between mx-auto mt-2 text-[#00000094]'>
                                <p>Discount</p>
                                <p className='text-[#20754a]'>-₹ 0.00</p>
                            </div>
                            <div className='flex justify-between mx-auto my-2 text-[#00000094]'>
                                <p>Taxes</p>
                                <p>₹ {(subTotalValue(Total()).taxes).toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between border-[#aaa] mx-auto my-5 py-3 border-t-2'>
                                <p className='font-bold'>Total</p>
                                <p  >₹ {(Total().toFixed(2))}</p>
                            </div>
                        </aside>
                    </section>

                    <section className='bg-[#f2f0eb] m-auto mt-8 mb-40 px-5 py-3 rounded-xl w-full max-w-[1180px]'>
                        <div className='flex gap-3'>
                            <img src="https://www.starbucks.in/assets/icon/info_red.svg" loading='lazy' alt="" />
                            <h1 className='font-bold'>Order once placed cannot be cancelled</h1>
                        </div>
                        <p>Review your order and address details to avoid cancellations. Please avoid cancellations to prevent food wastage.</p>
                    </section>

                    <section className='bottom-0 fixed w-full'>
                        <SlideBar
                            BtnName='Place Order'
                            cart={cartDetail}
                            pages={'ordering'}
                        />
                    </section>

                </> :

                <section className='flex flex-col justify-center items-center gap-3 m-auto w-full max-w-[1240px]'>
                    <img src="https://www.starbucks.in/assets/icon/NoCartfound.svg" loading='lazy' alt="" />
                    <h1 className='font-bold'>No items found!</h1>
                    <p className='text-[#00000084]'>Please add items to see here</p>
                    <Link to={'/ordering'}>
                        <button className='bg-[#00754a] hover:bg-[#1e3932] px-6 py-3 rounded-3xl w-[230px] font-bold text-white text-xs'>Go to Menu</button>
                    </Link>
                </section>
            }
        </main>
    )
}

export default Cart