import React, { useState } from 'react'
import LoginInput from './LoginInput'
import "./Login.css"
import { Link } from 'react-router-dom'

const LoginModal = ({ setOpen }) => {
    const [Data, setData] = useState({
        username: "",
        password: ""
    })

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(Data);
    }

    const onChange = (e) => {
        const { name, value } = e.target
        setData((prevStat) => ({
            ...prevStat,
            [name]: value
        }))
    }

    return (
        <div className='p-6'>
            <div className='text-end'>
                <Link to={'/'} onClick={() => setOpen(false)} className='font-bold text-[#00754a] text-xs hover:text-[#00754a] uppercase cursor-pointer'>Skip</Link>
            </div>
            <form onSubmit={onSubmit}>
                <h1 className='font-[Rubik] font-bold text-[24px]'>Login</h1>
                <LoginInput
                    myValue={Data.email}
                    onChange={onChange}
                    type="text"
                    name="username"
                    Header="email"
                    id='email'
                    placeholder="Enter Email ID or Mobile Number *" />
                <br />
                <LoginInput
                    myValue={Data.password}
                    onChange={onChange}
                    type="password"
                    name="password"
                    Header="Password"
                    id="Password"
                    placeholder="Enter Password *" />
                <p className='mt-2 font-[Rubik] text-[12px] text-slate-700'>Don't have an account?<Link to={'/registration'} onClick={() => setOpen(false)} className='ml-1 font-[600] text-[#00754a] hover:text-[#00754a] underline'>SignUp</Link></p>
                <div className='flex justify-center mt-10'>
                    <button className='bg-[#000000a8] active:bg-[#1e3932] opacity-60 px-6 py-3 rounded-3xl w-[330px] text-[#c7c7c7] text-xs'>Login</button>
                </div>
            </form>
            <div className='flex flex-col justify-center items-center'>
                <p className='mt-8 text-[11px]'>Facing trouble logging in?
                    <a href="#" className='font-[600] text-[#00754a] hover:text-[#00754a] underline'>Get Help</a></p>
                <p className='flex items-center gap-1 mt-3 text-xs'>
                    <img src="https://www.starbucks.in/assets/images/whatsapp-logo.png" loading='lazy' alt="" /><span>Already registered via WhatsApp?
                        <a href="#" className='font-[600] text-[#00754a] hover:text-[#00754a] underline'>Continue Here</a></span></p>
            </div>
        </div>
    )
}

export default LoginModal