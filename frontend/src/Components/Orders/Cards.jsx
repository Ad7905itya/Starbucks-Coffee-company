import { ConfigProvider, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import ModalSection from '../ModalSection'
import { Link } from 'react-router-dom';


const Cards = ({
    cardData,
    images,
    veg,
    name,
    dietaryInformation,
    description,
    basePrice,
    parameters,
    inStock
}) => {
    const [Open, setOpen] = useState(false);
    return (
        <>
            <div onClick={() => setOpen(true)} className="flex items-start gap-4 bg-[#f9f9f9] shadow-5xl hover:shadow-HoverShadow py-4 pr-0 pl-2 rounded-lg min-h-[232px]">
                <div className='flex-shrink-0 rounded-full w-[96px] h-[96px] overflow-hidden'>
                    <img className='h-full object-cover' src={images.small[0].url} alt="" loading='lazy' />
                </div>

                <div className='flex flex-col justify-between p-3 pt-0 pl-0 h-full'>
                    <div>
                        {veg ? <img src={'https://www.starbucks.in/assets/icon/veg.svg'} loading='lazy' alt="" /> : <img src={'https://www.starbucks.in/assets/icon/nonveg.svg'} loading='lazy' alt="" />}
                        <h2 className='mt-1 font-bold text-sm'>{name}</h2>
                        <p className='opacity-45 text-[10px]'>{dietaryInformation}</p>

                        <p className='opacity-65 mt-2 text-xs'>{description.length > 60 ? description.split('').slice(0, 60).join('') + '...' : description}</p>
                    </div>

                    <div className='flex justify-between'>
                        <p className='font-bold'>₹ {basePrice.toFixed(2)}</p>
                        {inStock ? <Link to={`/ordering/${parameters[0].value.split(' ').join('-')}/${name.split(' ').join('-')}`} state={cardData}>
                            <button className='bg-[#00754a] hover:bg-[#1e3932] shadow-5xl px-4 py-2 rounded-3xl font-bold text-white text-xs'>Add Item</button>
                        </Link> : <button className='bg-[#000000a8] active:bg-[#1e3932] opacity-60 px-6 py-3 rounded-3xl w-[330px] text-[#c7c7c7] text-xs'>Out of Stock</button>}
                    </div>

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
                    <ModalSection {...cardData} isHome={false} />
                </Modal>
            </ConfigProvider>
        </>
    )
}

export default Cards