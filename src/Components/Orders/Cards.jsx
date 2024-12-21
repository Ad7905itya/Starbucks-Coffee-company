import { ConfigProvider, Modal } from 'antd'
import React, { useState } from 'react'
import ModalSection from '../ModalSection'


const Cards = ({ cardData }) => {
    const [Open, setOpen] = useState(false);
    return (
        <div className="flex items-start gap-4 bg-[#f9f9f9] shadow-5xl hover:shadow-HoverShadow py-4 pr-0 pl-2 rounded-lg min-h-[232px]">
            <div onClick={()=> setOpen(true)} className='flex-shrink-0 rounded-full w-[96px] h-[96px] cursor-pointer overflow-hidden'>
                <img className='h-full object-cover' src={cardData.images.iconImage} alt="" loading='lazy' />
            </div>
            <div className='flex flex-col justify-between p-3 pt-0 pl-0 h-full'>
                <div>
                    <img src={cardData.images.sampleImage} loading='lazy' alt="" />
                    <h2 className='mt-1 font-medium text-sm'>{cardData.title}</h2>
                    <p className='opacity-45 text-[10px]'>{cardData.strength}</p>
                    <p className='opacity-65 mt-2 text-xs'>{cardData.description.length > 60 ? cardData.description.split('').slice(0, 60).join('') + '...' : cardData.description}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='font-medium'>₹ {cardData.price}.<span className='text-sm'>{cardData.paisa}</span></p>
                    <button className='bg-[#000000a8] active:bg-[#1e3932] opacity-60 px-5 py-2 rounded-3xl text-[#c7c7c7] text-xs'>Add Item</button>
                </div>
            </div>
            <ConfigProvider
                theme={{ cssVar: true }}>
                <Modal
                    open={Open}
                    closeIcon={false}
                    footer={false}
                    width={600}
                    onCancel={() => setOpen(false)}>
                    <ModalSection Data={cardData} modalImg={cardData.images.modalImage} />
                </Modal>
            </ConfigProvider>
        </div>
    )
}

export default Cards