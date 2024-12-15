import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Footer from './Footer'
import { CiSettings } from 'react-icons/ci'
import { ConfigProvider, Modal } from 'antd'
import LoginModal from './LoginPage/LoginModal'

const ProfileUser = () => {
    const [Open, setOpen] = useState(false);
    return (
        <>
            <Helmet>
                <title>Profile | Tata StarBucks</title>
            </Helmet>
            <main>
                <p className='m-auto px-8 py-3 max-w-[1300px] font-thin text-slate-600 text-sm'>{'Home > Account'}</p>
                <section className='relative bg-[#faf6ee] min-h-[450px] overflow-hidden'>
                    <span className='-top-5 left-0 absolute w-28'>
                        <img src="https://www.starbucks.in/assets/images/leaf_gold.svg" alt="" loading='lazy' />
                    </span>
                    <span className='-right-5 bottom-[120px] absolute w-28'>
                        <img src="https://www.starbucks.in/assets/images/dots_gold.svg" alt="" loading='lazy' />
                    </span>
                    <div className='flex flex-col items-center m-auto pt-14 pb-8 w-full max-w-[1240px]'>
                        <CiSettings size={28} className='self-end' />
                        <div className='flex flex-col justify-center items-center'>
                            <div className='border-[6px] border-white my-10 px-auto rounded-full w-[222px] h-[222px]'>
                                <div className='border-[rgb(203,162,88)] border-4 rounded-full w-[210px] h-[210px]'>
                                    <div style={{ backgroundImage: 'url(https://www.starbucks.in/assets/images/profileDP.svg)' }} className='border-[6px] border-white bg-cover bg-no-repeat bg-center rounded-full w-full h-full'></div>
                                </div>
                            </div>
                            <h1 className='font-bold text-2xl'>Welcome to Starbucks</h1>
                            <div className='py-5'>
                                <button onClick={() => setOpen(true)} className='bg-black px-8 py-2 rounded-3xl font-bold text-sm text-white'>Login or Sign Up</button>
                            </div>
                        </div>
                    </div>
                    <section className='bg-white rounded-3xl'>
                        <div className='flex justify-between items-center m-auto py-2 pt-16 border-b-2 max-w-[1240px]'>
                            <div className='flex items-center gap-2 py-2'>
                                <img loading='lazy' src="https://www.starbucks.in/assets/icon/help_centre.svg" alt="" />
                                <h1 className='font-[Rubik] font-medium text-[#505152] text-lg uppercase'>Help Center</h1>
                            </div>
                            <img loading='lazy' src="https://www.starbucks.in/assets/icon/arrow_right.svg" alt="" />
                        </div>
                    </section>
                </section>
                <ConfigProvider theme={{ cssVar: true }}>
                    <Modal open={Open} footer={false} closeIcon={false} width={600}>
                        <LoginModal setOpen={setOpen} />
                    </Modal>
                </ConfigProvider>
                <Footer />
            </main>
        </>
    )
}

export default ProfileUser