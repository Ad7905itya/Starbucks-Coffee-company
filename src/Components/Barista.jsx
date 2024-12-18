import React, { useState } from 'react'
import ModalSection from './ModalSection'
import { ConfigProvider, Modal } from 'antd'

const Barista = ({ item }) => {
  const [Open, setOpen] = useState(false);
  const [Data, setData] = useState({});

  const HandleOk = () => {
    setOpen(true);
    setData(item);
  }

  function detail() {
    return (
      <>
        <img src="https://www.starbucks.in/assets/icon/greyleafright.svg" loading="lazy" className="top-0 right-0 absolute w-12 lg:w-16" alt="" />
        <div className="flex flex-col items-start gap-1">
          <img src={Data.IconImage} loading="lazy" />
          <h1 className="font-bold text-lg">{Data.title}</h1>
          <p className="text-slate-400 text-xs">{Data.subTitle}</p>
        </div>
        {Data.milkBoxImage ? <div className="flex items-center gap-1 py-2">
          <img src={Data.milkBoxImage} className="w-5" loading="lazy" />
          <p className="text-[10px] uppercase">Milk</p>
        </div> : ''}
        <p className="pt-2 pb-4 text-slate-500 text-xs">{Data.description}</p>
        <h2 className="pt-2 pb-10">₹ <span className="font-bold">{Data.price}</span>.{Data.priceInCoin}</h2>
      </>
    )
  }

  return (
    <div className='mx-1 lg:mx-4'>
      <div className='bg-white shadow-5xl rounded-xl w-full h-full min-h-[130px] lg:min-h-[150px] cursor-pointer'>
        <div className='px-3 lg:px-5 py-3 lg:py-4'>
          <div className='flex gap-2'>
            <img onClick={HandleOk} className='rounded-xl w-14 lg:w-20 h-14 lg:h-20' src={item.image} alt="" />
            <div className='flex flex-col items-start gap-1'>
              <img className='w-3 h-3' src={item.IconImage} alt="" />
              <h1 className='font-bold text-[12px] text-wrap lg:text-sm'>{item.title}</h1>
              <p className='text-[7px] text-slate-600 lg:text-[9px]'>{item.subTitle}</p>
            </div>
          </div>
          <div className='flex justify-between items-center mt-5 ml-2 max-w-[300px]'>
            <p className='text-[14px]'>₹ <span className='mr-[1px] font-bold'>{item.price}</span><span>.{item.priceInCoin}</span></p>
            <button className='bg-[#00754a] hover:bg-[#1e3932] shadow-4xl px-5 py-[6px] rounded-3xl font-bold text-[8px] text-white lg:text-[12px]'>Add Item</button>
          </div>
        </div>
        <ConfigProvider
          theme={{ cssVar: true }}>
          <Modal
            open={Open}
            closeIcon={false}
            footer={false}
            onCancel={() => setOpen(false)}>
            <ModalSection detail={detail} Data={Data} />
          </Modal>
        </ConfigProvider>
      </div>
    </div>
  )
}

export default Barista