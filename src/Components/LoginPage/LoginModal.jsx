import React, { useContext, useState } from 'react'
import LoginInput from './LoginInput'
import "./Login.css"
import { Link, useLocation } from 'react-router-dom'
import { useLocalStorage } from '../../Hooks/useLocalStorage'
import { createPortal } from 'react-dom'
import { ContextCartLists } from '../../contexts/CartItemsContext'

const LoginModal = ({ setOpen }) => {
    const [PrevUser] = useLocalStorage('PrevUser', {});
    const [BtnEffect, setBtnEffect] = useState(false);
    const { loginAsGuest } = useContext(ContextCartLists);
    const path = useLocation();
    const [isUser, setIsUser] = useLocalStorage('User', {});
    const [Data, setData] = useState({
        username: "",
        password: ""
    })
    const [SubmitData, setSubmitData] = useState(false);
    const [Username, setUsername] = useState('');
    const [errors, setErrors] = useState({
        username: "",
        password: ""
    })
    const [InvalidPortal, setInvalidPortal] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (![PrevUser.email, PrevUser.number].includes(Username)) {
            if (SubmitData) {
                setInvalidPortal(true);
                setTimeout(() => {
                    setInvalidPortal(false);
                }, 3000);
            }
        } else {
            if (PrevUser.Password !== Data.password) {
                if (SubmitData) {
                    setInvalidPortal(true);
                    setTimeout(() => {
                        setInvalidPortal(false);
                    }, 3000);
                }
                setData(prev => ({ ...prev, password: "" }));
                setErrors({ ...errors, password: 'Please enter value' })
            } else {
                setIsUser(PrevUser);
                setOpen(false);
                if (path.pathname === '/') {
                    location.assign('/pay');
                } else {
                    location.assign('/');
                };
            }
        }
    }

    const onChange1 = (e) => {
        const inputValue = e.target.value
        setData((prevStat) => ({
            ...prevStat,
            username: inputValue
        }))

        if (!inputValue) {
            setErrors({ ...errors, username: 'Please enter value' });
            setUsername('');
        } else {
            setErrors({ ...errors, username: '' });
            setUsername(inputValue);
        }

        if (Data.password && inputValue) {
            setSubmitData(true);
            setUsername(inputValue);
        } else {
            setSubmitData(false);
        }
    }
    const onChange2 = (e) => {
        const inputValue = e.target.value
        setData((prevStat) => ({
            ...prevStat,
            password: inputValue
        }))

        if (!inputValue) {
            setErrors({ ...errors, password: 'Please enter value' });
        } else {
            setErrors({ ...errors, password: '' });
        }

        if (Username && inputValue.length >= 8) {
            setSubmitData(true);
        } else {
            setSubmitData(false);
        }
    }

    function onGuestLogin() {
        setBtnEffect(true);
        setTimeout(() => {
            setOpen(false);
            setBtnEffect(false);
            if (path.pathname === '/') {
                location.assign('/pay');
            } else {
                location.assign('/');
            };
        }, 2000);
        loginAsGuest();
    }

    return (
        <div className='p-6'>
            <div className='text-end'>
                <Link to={'/'} onClick={() => setOpen(false)} className='font-bold text-[#00754a] text-xs hover:text-[#00754a] uppercase cursor-pointer'>Skip</Link>
            </div>
            <form onSubmit={onSubmit}>
                <h1 className='font-[Rubik] font-bold text-[24px]'>Login</h1>
                <LoginInput
                    myValue={Data.username}
                    onChange={onChange1}
                    errors={errors.username}
                    type="text"
                    name="username"
                    Header="email"
                    id='email'
                    placeholder="Enter Email ID or Mobile Number *" />
                <br />
                <LoginInput
                    myValue={Data.password}
                    onChange={onChange2}
                    errors={errors.password}
                    type="password"
                    name="password"
                    Header="Password"
                    id="Password"
                    placeholder="Enter Password *" />
                <p className='mt-2 font-[Rubik] text-[12px] text-slate-700'>Don't have an account?<Link to={'/registration'} onClick={() => setOpen(false)} className='ml-1 font-[600] text-[#00754a] hover:text-[#00754a] underline'>SignUp</Link></p>
                <div className='flex justify-center mt-10'>
                    {SubmitData ? <button className='bg-[#00754a] hover:bg-[#1e3932] px-6 py-3 rounded-3xl w-[330px] font-bold text-white text-xs'>login</button> :
                        <button className='bg-[#000000a8] active:bg-[#1e3932] opacity-60 px-6 py-3 rounded-3xl w-[330px] text-[#c7c7c7] text-xs'>Login</button>}
                </div>

                <div className='flex flex-col justify-center items-center mt-4'>
                    {BtnEffect ? <button className='bg-[#00754a] hover:bg-[#1e3932] px-6 py-3 rounded-3xl w-[230px] h-10 font-bold text-white text-xs animate-pulse'></button> : <button onClick={onGuestLogin} className='bg-[#00754a] hover:bg-[#1e3932] px-6 py-3 rounded-3xl w-[230px] font-bold text-white text-xs'>Login as Guest</button>}
                </div>

            </form>
            <div className='flex flex-col justify-center items-center'>
                <p className='mt-8 text-[11px]'>Facing trouble logging in?
                    <a href="#" className='font-[600] text-[#00754a] hover:text-[#00754a] underline'>Get Help</a></p>
                <p className='flex items-center gap-1 mt-3 text-xs'>
                    <img src="https://www.starbucks.in/assets/images/whatsapp-logo.png" loading='lazy' alt="" /><span>Already registered via WhatsApp?
                        <a href="#" className='font-[600] text-[#00754a] hover:text-[#00754a] underline'>Continue Here</a></span></p>
            </div>
            {InvalidPortal && createPortal((
                <div className='top-0 left-0 fixed w-screen h-screen'>
                    <div className='bottom-0 left-[5%] lg:left-[18%] fixed flex justify-between items-center bg-yellow-300 px-2 lg:px-5 py-2 rounded-t-2xl w-[700px] lg:w-[850px] h-14 font-[Rubik] font-medium text-xs lg:text-sm uppercase'>
                        <h1>The details entered did not match our records. Retry with correct details.</h1>
                        <button
                            onClick={() => setInvalidPortal(false)}
                            className='bg-white px-5 py-1 rounded-xl font-bold'>Close</button>
                    </div>
                </div>
            ), document.querySelector('#portal'))}
        </div>
    )
}

export default LoginModal