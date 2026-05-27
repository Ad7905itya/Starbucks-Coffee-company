import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Footer from '../footer/Footer'
import { CiSettings } from 'react-icons/ci'
import { ConfigProvider, Modal } from 'antd'
import LoginModal from '../LoginPage/LoginModal'
import { BiBell } from 'react-icons/bi'
import UserDetails from './UserDetails'
import { fetchData } from '../../Hooks/handcraftCurations'
import { useAuth } from '../../Hooks/useAuth'
import BreadcrumbNav from '../BreadcrumbNav'
import EditProfileModal from './EditProfileModal'

const ProfileUser = () => {
    const [Open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [ProfileData, setProfileData] = useState([]);
    const { user, logout, setUser } = useAuth();

    const onClick = () => {
        logout();
        location.assign('/');
    }

    useEffect(() => {
        fetchData('profile').then(setProfileData);
    }, []);

    return (
        <>
            <Helmet>
                <title>Profile | Tata StarBucks</title>
            </Helmet>
            <main className='-top-48 lg:top-0 relative h-screen'>
                <BreadcrumbNav items={[
                    { label: 'Home', path: '/' },
                    { label: 'Account' }
                ]} />
                <div className='flex flex-col'>
                    <section style={{ backgroundColor: user ? '#1e3932' : '#faf6ee' }} className={`relative h-full min-h-[500px] md:top-0 top-36 overflow-hidden`}>
                        <span className='top-0 md:top-0 md:left-0 absolute w-28'>
                            <img src={user ? "https://www.starbucks.in/assets/icon/green-leaf.svg" : "https://www.starbucks.in/assets/images/leaf_gold.svg"} alt="" loading='lazy' />
                        </span>
                        <span className='-right-5 bottom-40 md:bottom-0 absolute w-28'>
                            <img src={user ? "https://www.starbucks.in/assets/icon/green-dots.svg" : "https://www.starbucks.in/assets/images/dots_gold.svg"} alt="" loading='lazy' />
                        </span>
                        <div className='relative flex flex-col items-center m-auto px-10 py-16 md:py-10 w-full max-w-[800px] lg:max-w-[1240px]'>
                            <div className='flex self-end gap-2'>
                                <BiBell size={28} color={user ? 'white' : ''} className='cursor-pointer' />
                                <CiSettings size={28} color={user ? 'white' : ''} className='cursor-pointer' />
                            </div>
                            <div className='top-8 md:top-10 absolute flex flex-col justify-center items-center'>
                                <div className='flex justify-center items-center my-10 px-auto border-[6px] border-white rounded-full w-32 md:w-44 h-32 md:h-44'>
                                    <div className='border-[rgb(203,162,88)] border-4 rounded-full w-28 md:w-40 h-28 md:h-40'>
                                        <div
                                            style={{
                                                backgroundImage: `url(${user?.profilePhoto || 'https://www.starbucks.in/assets/images/profileDP.svg'})`,
                                            }}
                                            className='relative bg-contain bg-no-repeat bg-center border-[6px] border-white rounded-full w-full h-full'
                                        >
                                            {user ? (
                                                <button
                                                    type='button'
                                                    onClick={() => setEditOpen(true)}
                                                    className='-bottom-8 left-[30%] md:left-[40%] absolute w-28 cursor-pointer'
                                                >
                                                    <img src='https://www.starbucks.in/assets/icon/edit-icon-green.svg' alt='Edit profile' loading='lazy' />
                                                </button>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                {user ?
                                    <>
                                        <h1 className='font-bold text-white text-2xl'>{user.FirstName} {user.LastName}</h1>
                                        <p className='py-2 font-bold text-white text-xl'>Welcome Tier</p>

                                    </> :
                                    <>
                                        <h1 className='font-bold text-2xl'>Welcome to Starbucks</h1>
                                        <div className='py-5'>
                                            <button onClick={() => setOpen(true)} className='bg-black px-8 py-2 rounded-3xl font-bold text-white text-sm'>Login or Sign Up</button>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </section>
                    <section className='-top-5 relative bg-white p-10 rounded-t-3xl'>
                        {user ? <>
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
                <EditProfileModal
                    open={editOpen}
                    onClose={() => setEditOpen(false)}
                    onSaved={(updatedUser) => setUser(updatedUser)}
                />
                <Footer />
            </main>
        </>
    )
}

export default ProfileUser