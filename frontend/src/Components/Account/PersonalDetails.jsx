import React, { useEffect, useState } from 'react'
import LoginInput from '../LoginPage/LoginInput'
import { Helmet } from 'react-helmet-async'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Checkbox, ConfigProvider } from 'antd';
import { useSessionStorage } from '../../Hooks/useSessionStorage';
import { useAuth } from '../../Hooks/useAuth';
import './Verification.css'
import { useNavigate } from 'react-router-dom';
import BreadcrumbNav from '../BreadcrumbNav';

const PersonalDetails = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [CalenderOpen, setCalenderOpen] = useState(false);
    const [calendarValue, setCalendarValue] = useState("");
    const [errors, setErrors] = useState({ firstName: '', lastName: '', birthDate: "" });
    const [Data] = useSessionStorage('CreateSubmitData');
    const [CheckBoxValue, setCheckBoxValue] = useState({});
    const [personalData, setPersonalData] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
    });
    const [registering, setRegistering] = useState(false);
    const [regError, setRegError] = useState("");

    let now = new Date();

    const validateName = (field, value) => {
        const trimmedValue = value.trim();
        const label = field === 'firstName' ? 'First' : 'Last';

        if (!trimmedValue) {
            return `${label} name is required!`;
        }
        if (!/^[a-zA-Z]+$/.test(trimmedValue)) {
            return 'Numbers & Special characters are not allowed. Please try again.';
        }
        if (trimmedValue.length < 3) {
            return `Your ${label} Name is Short`;
        }
        return '';
    };

    const handleNameChange = (field) => (e) => {
        const value = e.target.value;
        const errorMessage = validateName(field, value);
        setPersonalData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    };

    const formatDateForDisplay = (date) => {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    };

    const formatDateForServer = (date) => {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    };

    const handleCalendarSelect = (date) => {
        const displayValue = formatDateForDisplay(date);
        const serverValue = formatDateForServer(date);
        setCalendarValue(displayValue);
        setPersonalData((prev) => ({ ...prev, birthDate: serverValue }));
        setErrors((prev) => ({ ...prev, birthDate: '' }));
    };

    useEffect(() => {
        const handleWindowClick = () => {
            if (CalenderOpen) {
                setCalenderOpen(false);
            }
        };

        window.addEventListener('click', handleWindowClick);
        return () => {
            window.removeEventListener('click', handleWindowClick);
        };
    }, [CalenderOpen]);

    const isFormValid = personalData.firstName && personalData.lastName && personalData.birthDate && !errors.firstName && !errors.lastName && !errors.birthDate;

    const onClick = (e) => {
        e.stopPropagation();
        setCalenderOpen(true);
    };

    const onCheckBoxValue = (e) => {
        const { name, checked } = e.target;
        setCheckBoxValue((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleRegister = async () => {
        setRegistering(true);
        setRegError("");
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/register`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: Data?.email || "",
                    password: Data?.Password || "",
                    phone: Data?.number || "",
                    firstName: personalData.firstName,
                    lastName: personalData.lastName,
                    birthDate: personalData.birthDate,
                    preferences: {
                        email: CheckBoxValue?.firstValue || false,
                        sms: CheckBoxValue?.lastValue || false,
                    },
                }),
            });
            const result = await res.json();
            if (result.success) {
                sessionStorage.removeItem("CreateSubmitData");
                setUser(result.data);
                navigate('/welcome');
            } else {
                setRegError(result.message || "Registration failed");
            }
        } catch {
            setRegError("Network error. Try Again Later!");
        } finally {
            setRegistering(false);
        }
    }

    return (
        <main>
            <Helmet>
                <title>Personal Details | Tata Starbucks</title>
            </Helmet>
            <BreadcrumbNav items={[
                { label: 'Home', path: '/' },
                { label: 'Personal Details' }
            ]} />
            <section className='flex flex-col items-center m-auto px-10 max-w-[1320px]'>
                <img className='mt-4' src="https://starbucks.in/assets/icon/signup_process3.svg" alt="" loading='lazy' />
            </section>
            <section className='border-gray-400 mt-10 px-4 border-b-[1px]'>
                <div className='m-auto max-w-[1240px]'>
                    <h1 className='py-5 font-bold text-xl'>ONE FINAL STEP, TELL US A LITTLE ABOUT YOU</h1>
                </div>
            </section>
            <section className='m-auto px-10 xl:px-0 max-w-[1240px]'>
                <form className='relative w-[80%]' onSubmit={(e) => e.preventDefault()}>
                            <LoginInput
                        Header="FIRST NAME"
                        ParentClass="mt-4"
                        name="firstName"
                        id="firstName"
                        myValue={personalData.firstName}
                        onChange={handleNameChange('firstName')}
                        onBlur={handleNameChange('firstName')}
                        onInput={handleNameChange('firstName')}
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
                        onChange={handleNameChange('lastName')}
                        onBlur={handleNameChange('lastName')}
                        onInput={handleNameChange('lastName')}
                        errors={errors.lastName}
                        myValue={personalData.lastName}
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
                        onFocus={onClick}
                        errors={errors.birthDate}
                        Calendar={onClick}
                        BirthDate={true}
                        readOnly
                    />
                    {CalenderOpen && (
                        <div onClick={(e) => e.stopPropagation()} className='-top-32 z-20 absolute bg-white shadow-4xl p-3 rounded-xl w-80'>
                            <Calendar
                                value={new Date(now.getFullYear() - 18, now.getMonth(), now.getDate())}
                                maxDate={new Date(now.getFullYear() - 18, now.getMonth(), now.getDate())}
                                onChange={handleCalendarSelect}
                            />
                        </div>
                    )}
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
                <p className='mt-5 text-[#00000094] text-xs'>
                    By joining, I confirm I have read the
                    <span className='ml-1 text-[#00754a] underline cursor-pointer'>Terms Of Use</span> and
                    <span className='ml-1 text-[#00754a] underline cursor-pointer'>Privacy Policy</span>.
                    I agree with the Terms and Conditions.
                </p>

                <div className='flex justify-center mt-14 mb-20'>
                    {isFormValid ? (
                        <button
                            onClick={handleRegister}
                            disabled={registering}
                            className={`${registering ? 'opacity-60 bg-[#000000a8]' : 'bg-[#00754a] hover:bg-[#1e3932]'} px-6 py-3 rounded-3xl w-[330px] font-bold text-white text-xs`}>
                            {registering ? 'Signing Up...' : 'Finish Sign Up'}
                        </button>
                    ) : (
                        <button
                            disabled
                            className='bg-[#000000a8] active:bg-[#1e3932] opacity-60 px-6 py-3 rounded-3xl w-[330px] text-[#c7c7c7] text-xs'>
                            Finish Sign Up
                        </button>
                    )}
                </div>

                {regError && (
                    <div className='text-center mt-3 mb-5 text-red-600 text-sm'>{regError}</div>
                )}
            </section>
        </main>
    )
}

export default PersonalDetails