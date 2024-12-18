import React, { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet-async'
const LoginInput = React.lazy(()=> import('../LoginPage/LoginInput'));
import { useSessionStorage } from '../../Hooks/useSessionStorage'
import { Link } from 'react-router-dom'

const CreateAccount = () => {
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [value, setValue] = useState("");
    const [password, setPassword] = useState("");
    const [SubmitBtn, setSubmitBtn] = useState(false);
    const [SubmitData, setSubmitData] = useSessionStorage("CreateSubmitData", {})
    const [errorPassword, setErrorPassword] = useState({
        character: "",
        uppercase: "",
        number: "",
        symbol: ""
    });

    const [AccountData, setAccountData] = useState({
        email: "",
        number: "",
        Password: "",
        ConfirmPassword: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        mobile: "",
        setPass: "",
        setConfirmPass: ""
    });


    const onChange = useCallback((e) => {
        const { value } = e.target
        setAccountData((prevStat) => ({ ...prevStat, email: value }))
    })

    const onEmailValidate = useCallback((e) => {
        const { value } = e.target
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value) {
            errors.email = "Email is required!"
        } else if (!regex.test(value)) {
            errors.email = "Enter a valid Email ID"
        } else {
            errors.email = "";
        }

        AllValidation();
        setErrors(errors)
    })

    const handleChange = useCallback((e) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) {
            setValue(inputValue);
            setAccountData(prevStat => ({ ...prevStat, number: inputValue }))
        }

        if (!inputValue) {
            errors.mobile = "Mobile Number is required!"
        } else {
            if (inputValue.length < 10) {
                errors.mobile = "Please enter a valid Mobile Number"
            } else {
                errors.mobile = ""
            }
        }
        AllValidation();
        setErrors(errors)
    });

    const ConfirmPasswordValidation = useCallback((e) => {
        const inputValue = e.target.value
        if (!inputValue) {
            errors.setConfirmPass = "Confirm Password is required!";
        } else if (AccountData.Password !== inputValue) {
            errors.setConfirmPass = "The entered password did not match. Please try again.";
        } else {
            errors.setConfirmPass = ""
        }

        AllValidation();
        setErrors(errors);
    })

    const onChangeConfirmPassword = useCallback((e) => {
        const inputValue = e.target.value
        setAccountData(prevStat => ({ ...prevStat, ConfirmPassword: inputValue }));
    })

    const handleBlur = useCallback((e) => {
        const value = e.target.value;
        const minLength = /.{8,}/;
        const upperCase = /[A-Z]/;
        const digit = /[0-9]/;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (!value) {
            errors.setPass = "Password is required!"
        } else {
            errors.setPass = ""
            setAccountData(prevStat => ({ ...prevStat, Password: value }))
        }

        (!minLength.test(value)) ?
            errorPassword.character = "Character" : errorPassword.character = "pass";
        (!upperCase.test(value)) ?
            errorPassword.uppercase = "uppercase" : errorPassword.uppercase = "pass";
        (!digit.test(value)) ?
            errorPassword.number = "number" : errorPassword.number = "pass";
        (!specialChar.test(value)) ?
            errorPassword.symbol = "symbol" : errorPassword.symbol = "pass";

        AllValidation()
        setErrors(errors);
        setErrorPassword(errorPassword);
    });

    const AllValidation = () => {
        if ((Object.values(AccountData)).every((item) => item)
            && (Object.values(errors)).every((item) => !item)) {
            setSubmitBtn(true)
        } else {
            setSubmitBtn(false);
        }
    }
    return (
        <main>
            <Helmet>
                <title>Login | Tata Starbucks</title>
            </Helmet>
            <div className='lg:block hidden m-auto px-10 py-2 max-w-[1320px] font-[Rubik] text-slate-700 text-sm self-start'>{'Home > Create An Account'}</div>
            <section className='flex flex-col gap-10 bg-[#1e3932]'>
                <div className='relative h-20 lg:h-40'>
                    <img className='bottom-0 left-0 absolute' src="https://www.starbucks.in/assets/icon/green_ldots.svg" alt="" loading='lazy' />
                    <img className='top-0 right-0 absolute' src="https://www.starbucks.in/assets/icon/green_rleaf.svg" alt="" loading='lazy' />
                </div>
            </section>
            <section className='relative -top-8 bg-white pt-24 rounded-t-2xl min-h-60'>
                <div className='flex flex-col items-center'>
                    <img className='m-auto px-5 lg:px-10 w-full sm:max-w-[800px] lg:max-w-[1320px]' src="https://www.starbucks.in/assets/icon/signup_process1.svg" alt="" loading='lazy' />
                    <div className="border-gray-300 border-b-2 w-full">
                        <h1 className="m-auto mt-2 px-5 py-4 max-w-[800px] lg:max-w-[1240px] font-[600] font-[Rubik] text-xl">Login to Starbucks</h1>
                    </div>
                </div>
                <form className='m-auto px-10 py-2 max-w-[800px] lg:max-w-[1320px]' onSubmit={(e) => e.preventDefault()}>
                    <div className='gap-x-20 gap-y-5 grid grid-cols-1 lg:grid-cols-2'>
                        <div>
                            <LoginInput
                                Header="EMAIL ID"
                                myValue={AccountData.email}
                                onChange={onChange}
                                onBlur={onEmailValidate}
                                onInput={onEmailValidate}
                                errors={errors.email}
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Enter Email ID" />
                        </div>
                        <div>
                            <LoginInput
                                Header="MOBILE NUMBER"
                                myValue={value}
                                onChange={handleChange}
                                onBlur={handleChange}
                                errors={errors.mobile}
                                mobile={true}
                                name="number"
                                id="number"
                                type="tel"
                                placeholder="Enter Mobile Number" />
                        </div>
                        <div>
                            <LoginInput
                                Header="CREATE PASSWORD"
                                ParentClass="my-5"
                                myValue={password}
                                onChange={(e) => setPassword(e.target.value)}
                                Password={true}
                                isEyeOpen={isEyeOpen}
                                onBlur={handleBlur}
                                onInput={handleBlur}
                                errors={errors.setPass}
                                errorPassword={errorPassword}
                                setIsEyeOpen={setIsEyeOpen}
                                name="Password"
                                id="password"
                                type={!isEyeOpen ? "Password" : "text"}
                                placeholder="Enter Password" />
                        </div>
                        <div>
                            <LoginInput
                                Header=" CONFIRM PASSWORD"
                                ParentClass="my-5"
                                myValue={AccountData.ConfirmPassword}
                                onChange={onChangeConfirmPassword}
                                onBlur={ConfirmPasswordValidation}
                                onInput={ConfirmPasswordValidation}
                                errors={errors.setConfirmPass}
                                id="ConfirmPassword"
                                name="ConfirmPassword"
                                type="password"
                                placeholder="Re-enter Password *" />
                        </div>
                    </div>
                    <div className='flex justify-center mt-14 mb-20'>
                        {SubmitBtn ?
                            <Link to={{ pathname: "/registration/verification", state: SubmitData }}>
                                <button onClick={() => setSubmitData(AccountData)} className='bg-[#00754a] hover:bg-[#1e3932] px-6 py-3 rounded-3xl w-[330px] font-bold text-white text-xs'>Continue</button></Link> :

                            <button className='bg-[#000000a8] active:bg-[#1e3932] opacity-60 px-6 py-3 rounded-3xl w-[330px] text-[#c7c7c7] text-xs'>Continue</button>}
                    </div>
                </form>
            </section>
        </main>
    )
}

export default CreateAccount