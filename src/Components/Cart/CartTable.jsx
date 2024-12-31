import React, { useContext } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { ContextCartLists } from '../../contexts/CartItemsContext';
import { ConfigProvider, Modal } from 'antd';

const CartTable = ({ state }) => {
    const { CartQuantityDecrement, CartQuantityIncrement, Open, setOpen, DeleteItems } = useContext(ContextCartLists);

    return (
        <div className='flex justify-between items-center py-5 border-b-2'>
            <aside className='flex items-center gap-5'>
                <div className='rounded-xl w-20 h-20 overflow-hidden'>
                    <img src={state.image} loading='lazy' alt="" />
                </div>
                <div>
                    {state.veg ? <img src={'https://www.starbucks.in/assets/icon/veg.svg'} loading='lazy' alt="" /> : <img src={'https://www.starbucks.in/assets/icon/nonveg.svg'} loading='lazy' alt="" />}
                    <h1 className='mt-[5px] font-bold text-sm'>{state.ProductName}</h1>
                    {!state.options?.split(',').includes('undefined') && <p className='mt-2 font-[Rubik] text-[#1e3932d6] text-sm'>{state.options}</p>}
                </div>
            </aside>
            <aside>
                <div className='flex gap-20'>
                    <div className='flex items-center gap-2 border-[rgba(0,0,0,0.12)] border-2 px-[10px] py-[2px] rounded-md select-none'>
                        <BiMinus onClick={() => CartQuantityDecrement(state.ProductName)} size={18} color='#20754a' className='hover:bg-[#f9f6f6] cursor-pointer' />
                        <span>{state.quantity}</span>
                        <BiPlus onClick={() => CartQuantityIncrement(state.ProductName)} size={18} color='#20754a' className='hover:bg-[#f9f6f6] cursor-pointer' />
                    </div>
                    <h1 className='font-bold'>₹ {(state.quantity * state.price)?.toFixed(2)}</h1>
                </div>
            </aside>

            <ConfigProvider theme={{ cssVar: true }}>
                <Modal
                    style={{
                        backgroundColor: '#f2f0eb',
                        borderRadius: "20px",
                        overflow: "hidden",
                        padding: 0
                    }}
                    open={Open}
                    width={300}
                    closeIcon={false}
                    footer={null}
                    centered={true}>
                    <div className='flex flex-col justify-center items-center gap-5 p-5 min-h-60'>
                        <h1 className='px-3 font-medium text-[#1e3932] text-2xl text-center'>Are you sure you want to delete this item?</h1>
                        <div className='flex gap-2'>
                            <button onClick={() => setOpen(false)} className='border-2 px-12 py-1 rounded-2xl font-bold'>No</button>
                            <button onClick={() => DeleteItems(state.ProductName)} className='bg-red-500 px-12 py-1 rounded-2xl font-bold text-white'>Yes</button>
                        </div>
                    </div>
                </Modal>
            </ConfigProvider>
        </div>
    )
}

export default CartTable