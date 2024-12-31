import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom'
import ModalData from './ModalData';
import SlideBar from './SlideBar';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { ContextCartLists } from '../../contexts/CartItemsContext';

const ItemsDetail = () => {
    const { ProductCart, setProductCart, CartQuantityIncrement, Total } = useContext(ContextCartLists);
    const [cartDetail, setCartDetail] = useLocalStorage('cartDetail', {});
    const { state } = useLocation();
    const [Expand, setExpand] = useState(false);
    const cartData = state && {
        ProductName: state.name,
        image: state.images.small[0].url,
        veg: state.veg,
        price: Number((state.basePrice).toFixed(2)),
        quantity: 1,
        options: `${state.options?.customization.modifiersItems[0]?.items[0].name},${state.options?.customization.modifiersItems[1]?.items[0].name},${state.options?.addons?.modifiersItems[0]?.items[0].name}`
    }

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
                <title>Product Detail | Tata StarBucks</title>
            </Helmet>
            <div className='lg:block hidden m-auto px-8 py-2 max-w-[1300px] text-slate-700 text-sm'>{`Home > Order > ${state.parameters[0].value} > ${state.name}`}</div>

            <section className='flex flex-col justify-between w-full h-screen'>
                <section className='w-full h-full'>
                    <div className='relative bg-cover bg-no-repeat bg-center h-full object-cover' style={{ backgroundImage: `url(${state.images.large[0].url})` }}>
                        <div className='relative m-auto w-full max-w-[800px] lg:max-w-[1240px] h-full'>
                            <div className='top-14 right-0 z-10 absolute cursor-pointer'>
                                <img src="https://www.starbucks.in/assets/icon/expand.png" alt="" loading='lazy' />
                            </div>
                        </div>
                        <div className='absolute inset-0 flex bg-gradient-to-t from-10% from-black via-[#ffffff0e] to-[#000000c9] opacity-90 m-auto w-full transition-all'>
                        </div>

                        <div className='absolute inset-0 flex m-auto w-full max-w-[800px] lg:max-w-[1260px] h-full'>

                            <div className='relative top-36 flex flex-col px-8 font-[Rubik] text-white'>
                                <div className='flex items-center'>
                                    {state.veg ? <img src={'https://www.starbucks.in/assets/icon/veg.svg'} loading='lazy' alt="" /> : <img src={'https://www.starbucks.in/assets/icon/nonveg.svg'} loading='lazy' alt="" />}
                                    <p className='opacity-90 text-[10px] uppercase'>{state.veg ? 'Vegetarian' : 'Non-vegetarian'} {state.dietaryInformation}</p>
                                </div>
                                <h1 className='font-bold text-3xl'>{state.name}</h1>
                                <p className='opacity-85 mt-2 text-sm'>
                                    {Expand ? state.description :
                                        (state.description.length > 200 ? state.description.split('').slice(0, 200).join('') + '...' :
                                            state.description)}
                                    {state.description.length > 200 &&
                                        <span className='text-nowrap underline cursor-pointer' onClick={() => setExpand(!Expand)}> Read {Expand ? 'less' : 'More'}</span>}</p>
                                <div className='flex flex-wrap gap-2 mt-3'>
                                    {state.productIngredientsOptions.light.map((item, i) => <ModalData key={i} title={item.title} img={item.iconUrl} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <aside className='bottom-0 fixed bg-white rounded-t-3xl w-full overflow-hidden'>
                    {state.options && <section className='bg-white shadow-5xl px-4 py-2 w-full'>
                        <div className='flex flex-col m-auto w-full max-w-[800px] lg:max-w-[1240px] h-full'>
                            <div className='flex items-center gap-1 mt-2 px-5 font-[Rubik] font-medium text-[#000000c9] text-[14px]'>
                                <p>{state.options?.customization.title} (Default)</p></div>
                            <div className='flex items-center gap-1 opacity-80 mt-1 px-5 font-[Rubik] font-medium text-[#1e3932d6] text-[10px]'>
                                <p>{state.options?.customization.modifiersItems[0]?.items[0].name}, {state.options?.customization.modifiersItems[1]?.items[0].name} </p></div>
                        </div>
                    </section>}

                    {state.options?.addons && <section className='bg-white shadow-4xl px-4 py-2 rounded-t-2xl w-full'>
                        <div className='flex flex-col m-auto w-full max-w-[800px] lg:max-w-[1240px] h-full'>
                            <div className='flex items-center gap-1 mt-2 px-5 font-[Rubik] font-medium text-[#000000c9] text-[14px]'><p>{state.options.addons.title}</p></div>

                            <div className='flex items-center gap-1 opacity-80 mt-1 px-5 font-[Rubik] font-medium text-[#1e3932d6] text-[10px]'>
                                <p>{state.options.addons?.modifiersItems[0]?.items[0].name} </p></div>
                        </div>
                    </section>}

                    <SlideBar
                        cart={''}
                        BtnName='Add Item'
                        pages='ordering'
                        onClick={() => {
                            (ProductCart.find((item) => item.ProductName === cartData.ProductName) ?
                                ProductCart.filter((item) => item.ProductName === cartData.ProductName).map((item) => CartQuantityIncrement(item.ProductName)) :
                                setProductCart(prev => [...prev, cartData]))
                        }}
                        state={state} />
                </aside>
            </section>
        </main>
    )
}

export default ItemsDetail