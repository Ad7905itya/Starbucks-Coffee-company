import React, { useEffect, useState } from 'react'
import LoginInput from '../LoginPage/LoginInput'
import { Helmet } from 'react-helmet-async'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Checkbox, ConfigProvider } from 'antd';

const PersonalDetails = () => {
    const [CalenderOpen, setCalenderOpen] = useState(false);
    const [calendarValue, setCalendarValue] = useState("");
    const [SubmitBtn, setSubmitBtn] = useState(false);
    const [errors, setErrors] = useState({ firstName: '', lastName: '', BirthDate: "" });
    const [CheckBoxValue, setCheckBoxValue] = useState({});
    const [PersonalData, setPersonalData] = useState({
        firstName: "",
        lastName: "",
        BirthDate: "",
    });

    let now = new Date();
    useEffect(() => {
        if (calendarValue) {
            setCalenderOpen(false);
        }
    }, [calendarValue])


    document.onclick = () => {
        if (CalenderOpen) {
            setCalenderOpen(false);
        }
    }

    const onFirstNameBlur = (e) => {
        const inputValue = e.target.value
        if (!inputValue) {
            errors.firstName = "First name is required!";
        } else if (inputValue && inputValue.length < 3) {
            errors.firstName = "Numbers & Special characters are not allowed. Please try again.";
        } else {
            errors.firstName = ""
        }

        setPersonalData(prev => ({ ...prev, firstName: inputValue }))
        setErrors(errors);
    }

    const onLastNameBlur = (e) => {
        const inputValue = e.target.value
        if (!inputValue) {
            errors.lastName = "Last name is required!";
        } else if (inputValue && inputValue.length < 3) {
            errors.lastName = "Numbers & Special characters are not allowed. Please try again.";
        } else {
            errors.lastName = ""
        }

        setPersonalData(prev => ({ ...prev, lastName: inputValue }))
        setErrors(errors);
    }

    const onChangeBirth = (e) => {
        const inputValue = e.target.value
        if (!inputValue) {
            errors.BirthDate = "Please select date";
        } else {
            errors.BirthDate = ""
        }

        setPersonalData(prev => ({ ...prev, BirthDate: calendarValue }))
        setErrors(errors);
    }
    const onClick = (e) => {
        e.stopPropagation()
        setCalenderOpen(true);
    };

    const onCheckBoxValue = (e) => {
        const { name, checked } = e.target
        setCheckBoxValue(prev => ({
            ...prev,
            [name]: checked
        }));
    }

    return (
        <main>
            <Helmet>
                <title>Login | Tata Starbucks</title>
            </Helmet>
            <div className='m-auto px-10 py-2 max-w-[1320px] font-[Rubik] text-slate-700 text-sm self-start'>{'Home > Personal Details'}</div>
            <section className='flex flex-col items-center m-auto px-10 max-w-[1320px]'>
                <img className='mt-4' src="https://starbucks.in/assets/icon/signup_process3.svg" alt="" loading='lazy' />
            </section>
            <section className='border-gray-400 mt-10 px-4 border-b-[1px]'>
                <div className='m-auto max-w-[1240px]'>
                    <h1 className='py-5 font-bold text-xl'>ONE FINAL STEP, TELL US A LITTLE ABOUT YOU</h1>
                </div>
            </section>
            <section className='m-auto px-10 xl:px-0 max-w-[1240px]'>
                <form className='relative w-[80%]'>
                    <LoginInput
                        Header="FIRST NAME"
                        ParentClass="mt-4"
                        name="firstName"
                        id="firstName"
                        myValue={PersonalData.firstName}
                        onChange={onFirstNameBlur}
                        onBlur={onFirstNameBlur}
                        onInput={onFirstNameBlur}
                        errors={errors.firstName}
                        type="text"
                        placeholder="Enter First Name"
                    />
                    <LoginInput
                        Header="LAST NAME"
                        name="lastName"
                        ParentClass="mt-4"
                        id="lastName"
                        type="text"
                        onBlur={onLastNameBlur}
                        onInput={onLastNameBlur}
                        errors={errors.lastName}
                        myValue={PersonalData.lastName}
                        onChange={onLastNameBlur}
                        placeholder="Enter Last Name"
                    />
                    <LoginInput
                        Header="BIRTH DATE"
                        name="dob"
                        ParentClass="mt-4"
                        id="Dob"
                        type="text"
                        placeholder="DD-MM-YYYY *"
                        myValue={calendarValue}
                        onChange={onChangeBirth}
                        onBlur={onChangeBirth}
                        onInput={onChangeBirth}
                        errors={errors.BirthDate}
                        Calendar={onClick}
                        BirthDate={true}
                    />
                    {CalenderOpen && <div onClick={(e) => e.stopPropagation()} className='-top-32 z-20 absolute bg-white shadow-4xl p-3 rounded-xl w-80'>
                        <Calendar
                            value={new Date(now.getFullYear() - 18, now.getMonth(), now.getDate())}
                            maxDate={new Date(now.getFullYear() - 18, now.getMonth(), now.getDate())} onChange={(e) => setCalendarValue(new Date(e).toLocaleDateString())} />
                    </div>}
                </form>

                <div className='flex justify-end items-center mt-8 w-[80%]'>
                    <div style={{ backgroundImage: 'url(https://www.starbucks.in/media/referal-bg-63GPVQLS.svg)' }} className='flex flex-col items-center bg-cover bg-no-repeat bg-center mt-10 px-20 p-5 rounded-2xl w-full max-w-[800px]'>
                        <h1 className='font-bold'>Got a referral code?</h1>
                        <p className='mb-5 text-xs'>If you have a Starbucks referral code, enter it here for a special reward.</p>
                        <button className='bg-black px-5 py-2 rounded-3xl font-bold text-white text-xs'>Enter Code</button>
                    </div>
                </div>
            </section>
            <section className='border-gray-400 mt-10 px-4 border-b-[1px]'>
                <div className='m-auto max-w-[1240px]'>
                    <h1 className='py-5 font-bold text-xl'>PREFERENCES & TERMS</h1>
                </div>
            </section>
            <section className='m-auto px-10 xl:px-0 max-w-[1240px]'>
                <p className='mt-5 text-[#00000094] text-sm'>Where shall we reach you?</p>
                <ConfigProvider theme={{ cssVar: true }}>
                    <div className='flex gap-28 my-12 ml-5'>
                        <Checkbox
                            style={{ fontSize: 17 }}
                            name='firstValue'
                            onChange={onCheckBoxValue}>E-Mail</Checkbox>
                        <Checkbox
                            style={{ fontSize: 17 }}
                            name='lastValue'
                            onChange={onCheckBoxValue}>SMS</Checkbox>
                    </div>
                </ConfigProvider>
                <p className='mt-5 text-[#00000094] text-xs'>By joining, I confirm I have read the  <span className='ml-1 text-[#00754a] underline cursor-pointer'>Terms Of Use</span> and  <span className='ml-1 text-[#00754a] underline cursor-pointer'>Privacy Policy</span> . I agree with the Terms and Conditions.</p>
                <div className='flex justify-center mt-14 mb-20'>
                    {SubmitBtn ?
                        <button className='bg-[#00754a] hover:bg-[#1e3932] px-6 py-3 rounded-3xl w-[330px] font-bold text-white text-xs'>Finish Sign Up</button> :

                        <button className='bg-[#000000a8] active:bg-[#1e3932] opacity-60 px-6 py-3 rounded-3xl w-[330px] text-[#c7c7c7] text-xs'>Finish Sign Up</button>}
                </div>
            </section>
        </main>
    )
}

export default PersonalDetails