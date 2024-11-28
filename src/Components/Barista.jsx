import React, { useState } from 'react'
import ModalSection from './ModalSection'
import { Modal } from 'antd'

const Barista = ({ item }) => {
  const [Open, setOpen] = useState(false);
  const [Data, setData] = useState({});
  const HandleOk = () => {
    setOpen(true);
    setData(item);
  }
  return (
    <div className='bg-white rounded-xl w-full h-full cursor-pointer'>
      <div className='py-4'>
        <div className='flex gap-2 p-5'>
          <img onClick={HandleOk} className='rounded-xl w-20 h-20' src={item.image} alt="" />
          <div className='flex flex-col items-start'>
            <img className='w-5 h-5' src={item.IconImage} alt="" />
            <h1 className='font-bold text-lg text-wrap'>{item.title}</h1>
            <p className='text-[9px] text-slate-600'>{item.subTitle}</p>
          </div>
        </div>
        <div className='flex justify-between items-center mx-8'>
          <p className='text-[14px]'>₹ <span className='mr-[1px] font-bold'>{item.price}</span><span>.{item.priceInCoin}</span></p>
          <button className='bg-[#00754a] hover:bg-[#1e3932] shadow-4xl px-4 py-2 rounded-3xl font-bold text-[12px] text-white'>Add Item</button>
        </div>
      </div>
      <Modal open={Open} closeIcon={false} footer={false} onCancel={() => setOpen(false)}  >
        <ModalSection Data={Data} />
      </Modal>
    </div>
  )
}

export default Barista