import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '../../Hooks/useLocalStorage'

const Welcome = () => {
    const [name] = useLocalStorage('User', {});
    const [DayTime, setDayTime] = useState('');
    const Now = new Date();

    useEffect(() => {

        if (0 <= Now.getHours() && Now.getHours() < 3) {
            setDayTime('Night');
        } else if (3 <= Now.getHours() && Now.getHours() < 12) {
            setDayTime('Morning');
        } else if (12 <= Now.getHours() && Now.getHours() < 16) {
            setDayTime('Afternoon');
        } else if (16 <= Now.getHours() && Now.getHours() < 23) {
            setDayTime('Evening');
        }

    }, [])

    return (
        <main onClick={()=> location.assign('/')} className='top-0 left-0 absolute flex justify-center items-center bg-cover bg-no-repeat bg-center w-full h-screen' style={{ backgroundImage: 'url(https://preprodtsbstorage.blob.core.windows.net/cms/uploads/IMG_8749_d47dfc585e.png)' }}>
            <section className='flex flex-col items-center text-white'>
                <img width={150} src="https://www.starbucks.in/assets/icon/logo.svg" loading='lazy' alt="" />
                <h1 className='mt-5 font-bold text-3xl'>Good {DayTime} {Object.keys(name).length ? name.FirstName : 'User'}</h1>
                <p className='font-[Rubik] font-thin text-base'>Embrace the holiday spirit with our seasonal favourites!</p>
                <button className='mt-20'>
                    <img src="https://www.starbucks.in/assets/icon/arrow_down.svg" loading='lazy' alt="" />
                </button>
            </section>
        </main>
    )
}

export default Welcome