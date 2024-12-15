import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocalStorage } from '../../Hooks/useLocalStorage'
import "./Verification.css"
import { ConfigProvider, Flex, Input, Modal } from 'antd'
import { createPortal } from 'react-dom'


const Verification = () => {
    const [ReceiveData] = useLocalStorage("CreateSubmitData");
    const [TimeRemain, setTimeRemain] = useState(20);
    const [InvalidPortal, setInvalidPortal] = useState(false);
    const [OptNumber, setOptNumber] = useState('');
    const [CheckBtn, setCheckBtn] = useState(false);
    const [SubmitData, setSubmitData] = useState("");
    const [Open, setOpen] = useState(true);

    const OTPGenerate = () => {
        const digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < 6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }

        return OTP
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemain(TimeRemain - 1);;
        }, 1000);


        return () => clearInterval(interval);
    }, [TimeRemain]);


    useEffect(() => {
        const OtpDigits = OTPGenerate();
        setOptNumber(OtpDigits);
    }, [])

    const onChange = (text) => {
        setCheckBtn(true);
        setSubmitData(text);
    };
    const onInput = (values) => {
        if (values.length < 6) {
            setCheckBtn(false);
        }
    };
    const sharedProps = {
        onChange,
        onInput
    };

    const HandleChange = () => {
        location.reload();
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (SubmitData !== OptNumber) {
            setInvalidPortal(true);
            setTimeout(() => {
                setInvalidPortal(false);
            }, 3000);
        } else {
            location.href = 'http://localhost:5173/registration/personaldetails'
        }
    }

    return (
        <main>
            <Helmet>
                <title>Tata Starbucks</title>
            </Helmet>
            <div className='m-auto px-10 py-2 max-w-[1320px] font-[Rubik] text-slate-700 text-sm self-start'>{'Home > Verification'}</div>
            <section className='flex flex-col items-center m-auto px-10 max-w-[1320px]'>
                <img className='mt-8' src="https://starbucks.in/assets/icon/signup_process2.svg" alt="" loading='lazy' />
                <div className='mt-12 self-start'>
                    <h1 className='mb-3 font-bold'>OTP was sent to <span className='font-[Rubik] font-medium text-[#00754a] underline cursor-pointer'>+91xxxxxxxx{(ReceiveData?.number)?.split('').slice(8, 10).join('')}</span></h1>
                    <p>Please enter the OTP you have received on your registered Mobile Number.</p>
                </div>
                <div className='flex flex-col items-center gap-5 mt-10'>
                    <h1 className='mb-4 font-light text-[#000000de] text-sm uppercase'>Enter OTP</h1>
                    <form onSubmit={onSubmit}>
                        <ConfigProvider theme={{ cssVar: true }}>
                            <Flex gap="middle" align="flex-start" vertical>
                                <Input.OTP mask="•" {...sharedProps} />
                            </Flex>
                        </ConfigProvider>
                        {TimeRemain < 15 && <Modal
                            open={Open}
                            onOk={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                            closeIcon={false}
                            okButtonProps={{ style: { backgroundColor: '#00754a' } }}
                            cancelButtonProps={{ style: { borderColor: '#00754a', color: '#00754a' } }}>
                            You OTP Number is : {OptNumber}
                        </Modal>}
                        <div className='flex flex-col items-center gap-5 mt-10 text-xs'>
                            {TimeRemain >= 0 && <p>Time Remaining 00:{TimeRemain.toString().length === 1 ? '0' + TimeRemain : TimeRemain}s</p>}
                            <p>Didn't receive an OTP?
                                <span onClick={HandleChange} className='ml-1 text-[#00754a] underline cursor-pointer'>Resend</span></p>
                        </div>
                        <div className='flex justify-center mt-20 mb-20'>
                            {CheckBtn ? <button className='bg-[#00754a] hover:bg-[#1e3932] px-6 py-3 rounded-3xl w-[330px] font-bold text-white text-xs'>Confirm</button> :
                                <button className='bg-[#000000a8] active:bg-[#1e3932] opacity-60 px-6 py-3 rounded-3xl w-[330px] text-[#c7c7c7] text-xs'>Confirm</button>}
                        </div>
                    </form>
                </div>
            </section>
            {InvalidPortal && createPortal((
                <div className='top-0 left-0 fixed w-screen h-screen'>
                    <div className='bottom-0 left-[21%] fixed flex justify-between items-center bg-yellow-300 px-5 py-2 rounded-t-2xl w-[850px] h-14 font-medium text-sm uppercase font[Rubik]'>
                        <h1>Invalid Otp</h1>
                        <button
                            onClick={() => setInvalidPortal(false)}
                            className='bg-white px-5 py-1 rounded-xl font-bold'>Close</button>
                    </div>
                </div>
            ), document.querySelector('#portal'))}
        </main>
    )
}

export default Verification