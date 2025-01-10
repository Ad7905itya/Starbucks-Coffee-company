import { ConfigProvider, Modal } from 'antd';
import React, { useState } from 'react'
import ModalSection from '../ModalSection';

const GiftCards = ({ title, BannerImg, description }) => {
    const [Open, setOpen] = useState(false);
    const [Data, setData] = useState({})
    const eventHandler = () => {
        setOpen(true);
        setData({ title, BannerImg, description });

    }

    function detail() {
        return (
            <>
                <img src="https://www.starbucks.in/assets/icon/greyleafright.svg" loading="lazy" className="top-0 right-0 absolute w-16" alt="" />
                <div className="flex flex-col items-start gap-2">
                    <h1 className="font-bold text-lg">{Data.title}</h1>
                    <p className="mb-20 text-slate-400 text-xs">{Data.description}</p>
                </div>
            </>
        )
    }

    return (
        <div className='relative flex items-center bg-[#f9f9f9] shadow-5xl py-4 pr-0 pl-20 lg:pl-28 rounded-md w-[300px] lg:w-[320px]'>
            <div className='top-3 -left-14 lg:-left-6 absolute shadow-5xl rounded-md w-[130px] lg:w-[140px] cursor-pointer overflow-hidden'>
                <img onClick={eventHandler} src={BannerImg} alt="" loading='lazy' />
            </div>
            <div className='px-5'>
                <h1 className='mb-2 font-bold'>{title}</h1>
                <p className='mb-8 text-[#212529] text-xs leading-4'>{description}</p>
                <button className='bg-[#00754a] hover:bg-[#1e3932] shadow-4xl px-4 py-2 rounded-3xl font-bold text-[12px] text-white'>Add Item</button>
            </div>
            <ConfigProvider
                theme={{ cssVar: true }}>
                <Modal
                    open={Open}
                    closeIcon={false}
                    footer={false}
                    onCancel={() => setOpen(false)}>
                    <ModalSection detail={detail} isHome={true} Data={{ ...Data, isGiftCard: true }} images={Data.largeImage || Data.BannerImg} />
                </Modal>
            </ConfigProvider>
        </div>
    )
}

export default GiftCards