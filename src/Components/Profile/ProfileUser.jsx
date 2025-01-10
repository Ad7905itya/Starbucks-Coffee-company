import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Footer from '../footer/Footer'
import { CiSettings } from 'react-icons/ci'
import { ConfigProvider, Modal } from 'antd'
import LoginModal from '../LoginPage/LoginModal'
import { useLocalStorage } from '../../Hooks/useLocalStorage'
import { useSessionStorage } from '../../Hooks/useSessionStorage'
import { BiBell } from 'react-icons/bi'
import UserDetails from './UserDetails'
import { ProfileData } from '../../Data/ProfileData'

const ProfileUser = () => {
    const [Open, setOpen] = useState(false);
    const [isUserLogin, setIsUserLogin] = useLocalStorage('User', {});
    const [Previous, setPrevious] = useLocalStorage('PrevUser', {});
    const [Data, setData] = useSessionStorage('CreateSubmitData', {});
    const [ProductCart, setProductCart] = useLocalStorage('CartItems', []);
    const [cartDetail, setCartDetail] = useLocalStorage('cartDetail', {});
    const onClick = () => {
        setPrevious(isUserLogin);
        setCartDetail({});
        setProductCart([]);
        setData({})
        setIsUserLogin({});
        location.assign('/')
    }

    return (
        <>
            <Helmet>
                <title>Profile | Tata StarBucks</title>
            </Helmet>
            <main className='relative -top-48 lg:top-0 h-screen'>
                <p className='lg:block hidden m-auto px-8 py-3 max-w-[1300px] font-thin text-slate-600 text-sm'>{'Home > Account'}</p>
                <div className='flex flex-col'>
                    <section style={{ backgroundColor: Object.keys(isUserLogin).length ? '#1e3932' : '#faf6ee' }} className={`relative h-full min-h-[500px] overflow-hidden`}>
                        <span className='-top-5 left-0 absolute w-28'>
                            <img src={Object.keys(isUserLogin).length ? "https://www.starbucks.in/assets/icon/green-leaf.svg" : "https://www.starbucks.in/assets/images/leaf_gold.svg"} alt="" loading='lazy' />
                        </span>
                        <span className='-right-5 bottom-5 absolute w-28'>
                            <img src={Object.keys(isUserLogin).length ? "https://www.starbucks.in/assets/icon/green-dots.svg" : "https://www.starbucks.in/assets/images/dots_gold.svg"} alt="" loading='lazy' />
                        </span>
                        <div className='relative flex flex-col items-center m-auto px-8 pt-14 pb-8 w-full max-w-[800px] lg:max-w-[1240px]'>
                            <div className='flex gap-2 self-end'>
                                <BiBell size={28} color='white' className='cursor-pointer' />
                                <CiSettings size={28} color={Object.keys(isUserLogin).length ? 'white' : ''} className='cursor-pointer' />
                            </div>
                            <div className='top-8 absolute flex flex-col justify-center items-center'>
                                <div className='border-[6px] border-white my-10 px-auto rounded-full w-[222px] h-[222px]'>
                                    <div className='border-[rgb(203,162,88)] border-4 rounded-full w-[210px] h-[210px]'>
                                        <div style={{ backgroundImage: 'url(https://www.starbucks.in/assets/images/profileDP.svg)' }} className='relative border-[6px] border-white bg-cover bg-no-repeat bg-center rounded-full w-full h-full'>
                                            {Object.keys(isUserLogin).length ? <span className='-bottom-8 left-[40%] absolute w-28 cursor-pointer'>
                                                <img src="https://www.starbucks.in/assets/icon/edit-icon-green.svg" alt="" loading='lazy' />
                                            </span> : ""}
                                        </div>
                                    </div>
                                </div>
                                {Object.keys(isUserLogin).length ?
                                    <>
                                        <h1 className='font-bold text-2xl text-white'>{isUserLogin.FirstName} {isUserLogin.LastName}</h1>
                                        <p className='py-2 font-bold text-white text-xl'>Welcome Tier</p>

                                    </> :
                                    <>
                                        <h1 className='font-bold text-2xl'>Welcome to Starbucks</h1>
                                        <div className='py-5'>
                                            <button onClick={() => setOpen(true)} className='bg-black px-8 py-2 rounded-3xl font-bold text-sm text-white'>Login or Sign Up</button>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </section>
                    <section className='relative -top-5 bg-white p-10 rounded-t-3xl'>
                        {Object.keys(isUserLogin).length ? <>
                            {ProfileData.map((item, i) =>
                                <UserDetails key={i} image={item.image} >{item.title}</UserDetails>)}
                            <div onClick={onClick} className='flex gap-2 mx-auto mt-8 w-full max-w-[800px] lg:max-w-[900px] font-bold text-[#d62b1f] text-xl cursor-pointer'>
                                <img src="https://www.starbucks.in/assets/icon/logout.svg" loading='lazy' alt="" /> <span className='uppercase'>LogOut</span>
                            </div>
                        </> : <UserDetails
                            image={"https://www.starbucks.in/assets/icon/help_centre.svg"}>
                            Help Center
                        </UserDetails>}
                    </section>
                </div>
                <ConfigProvider theme={{ cssVar: true }}>
                    <Modal open={Open} footer={false} closeIcon={false} width={innerWidth > 700 ? 600 : 500}>
                        <LoginModal setOpen={setOpen} />
                    </Modal>
                </ConfigProvider>
                <Footer />
            </main>
        </>
    )
}

export default ProfileUser