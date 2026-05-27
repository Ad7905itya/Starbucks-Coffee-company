import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import "./Verification.css"
import { ConfigProvider, Flex, Input, Modal } from 'antd'
import { createPortal } from 'react-dom'
import { useSessionStorage } from '../../Hooks/useSessionStorage'
import { Link, useNavigate } from 'react-router-dom'
import BreadcrumbNav from '../BreadcrumbNav'

const Verification = () => {
    const [ReceiveData] = useSessionStorage("CreateSubmitData");
    const [TimeRemain, setTimeRemain] = useState(20);
    const [InvalidPortal, setInvalidPortal] = useState(false);
    const [InvalidMsg, setInvalidMsg] = useState("Invalid OTP");   // ← dynamic error message
    const [SubmitData, setSubmitData] = useState("");
    const [CheckBtn, setCheckBtn] = useState(false);
    const [Open, setOpen] = useState(false);                        // ← Modal default false ab
    const [nextPage, setNxtPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ─── Timer ───────────────────────────────────────────────────────────────
    useEffect(() => {
        if (TimeRemain <= 0) return;
        const interval = setInterval(() => {
            setTimeRemain(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [TimeRemain]);

    // ─── Page mount → OTP bhejo ──────────────────────────────────────────────
    useEffect(() => {
        if (ReceiveData?.email || ReceiveData?.number) {
            sendOTP();
        }
    }, []);

    // ─── OTP send (mount + resend dono ke liye) ───────────────────────────────
    const sendOTP = async () => {
        try {
            const res = await fetch("/api/otp/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: ReceiveData?.email,
                    phone: ReceiveData?.number,
                }),
            });
            const data = await res.json();
            if (!data.success) {
                showError(data.message || "OTP send karne mein dikkat aayi");
            }
        } catch {
            showError("Network error. Dobara koshish karo.");
        }
    };

    // ─── Ant Design Input.OTP callbacks ──────────────────────────────────────
    const onChange = (text) => {
        setSubmitData(text);
        setCheckBtn(text.length === 6);    // sirf 6 digits pe enable
    };

    const onInput = (values) => {
        if (values.length < 6) setCheckBtn(false);
    };

    const sharedProps = { onChange, onInput };

    // ─── Resend ───────────────────────────────────────────────────────────────
    const HandleChange = () => {
        setTimeRemain(20);
        setSubmitData("");
        setCheckBtn(false);
        sendOTP();
    };

    // ─── Submit → verify → register ──────────────────────────────────────────
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!CheckBtn || loading) return;

        setLoading(true);
        try {
            // ✅ Sirf OTP verify karo
            const verifyRes = await fetch("/api/otp/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: ReceiveData?.email,
                    otp: SubmitData,
                }),
            });
            const verifyData = await verifyRes.json();

            if (!verifyData.success) {
                showError(verifyData.message || "Invalid OTP");
                return;
            }

            // ✅ sessionStorage mat hatao — Page 3 ko data chahiye
            // ✅ bas navigate karo
            navigate("/registration/personaldetails");

        } catch {
            showError("Network error. Dobara koshish karo.");
        } finally {
            setLoading(false);
        }
    };

    // ─── Error portal helper ──────────────────────────────────────────────────
    const showError = (msg) => {
        setInvalidMsg(msg);
        setInvalidPortal(true);
        setTimeout(() => setInvalidPortal(false), 3000);
    };

    return (
        <main>
            <Helmet>
                <title>Tata Starbucks</title>
            </Helmet>
            <BreadcrumbNav items={[
                { label: 'Home', path: '/' },
                { label: 'Verification' }
            ]} />
            <section className='flex flex-col items-center m-auto px-10 max-w-[1320px]'>
                <img className='mt-8' src="https://starbucks.in/assets/icon/signup_process2.svg" alt="" loading='lazy' />
                <div className='mt-12 self-start'>
                    <h1 className='mb-3 font-bold'>
                        OTP sent to{' '}
                        <span className='font-[Rubik] font-medium text-[#00754a] underline cursor-pointer'>
                            +91xxxxxxxx{(ReceiveData?.number)?.split('').slice(8, 10).join('')}
                        </span>
                        {' '}and{' '}
                        <span className='font-[Rubik] font-medium text-[#00754a] underline cursor-pointer'>
                            {ReceiveData?.email}
                        </span>
                    </h1>
                    <p>Please enter the OTP received on your registered Mobile Number and Email.</p>
                </div>

                <div className='flex flex-col items-center gap-5 mt-10'>
                    <h1 className='mb-4 font-light text-[#000000de] text-sm uppercase'>Enter OTP</h1>
                    <form onSubmit={onSubmit}>
                        <ConfigProvider theme={{ cssVar: true }}>
                            <Flex gap="middle" align="flex-start" vertical>
                                <Input.OTP mask="•" {...sharedProps} />
                            </Flex>
                        </ConfigProvider>

                        {/* Timer Modal — ab sirf manually trigger hoga, auto nahi */}
                        <Modal
                            open={Open}
                            onOk={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                            closeIcon={false}
                            okButtonProps={{ style: { backgroundColor: '#00754a' } }}
                            cancelButtonProps={{ style: { borderColor: '#00754a', color: '#00754a' } }}>
                            OTP bheja gaya hai aapki email aur mobile number pe.
                        </Modal>

                        <div className='flex flex-col items-center gap-5 mt-10 text-xs'>
                            {TimeRemain > 0 && (
                                <p>Time Remaining 00:{TimeRemain.toString().length === 1 ? '0' + TimeRemain : TimeRemain}s</p>
                            )}
                            <p>Didn't receive an OTP?{' '}
                                {TimeRemain > 0
                                    ? <span className='ml-1 text-gray-400'>Wait {TimeRemain}s</span>
                                    : <span onClick={HandleChange} className='ml-1 text-[#00754a] underline cursor-pointer'>Resend</span>
                                }
                            </p>
                        </div>

                        <div className='flex justify-center mt-20 mb-20'>
                            {CheckBtn
                                ? <button
                                    type="submit"
                                    disabled={loading}
                                    className='bg-[#00754a] hover:bg-[#1e3932] disabled:opacity-60 px-6 py-3 rounded-3xl w-[330px] font-bold text-white text-xs'>
                                    {loading ? "Verifying..." : "Confirm"}
                                </button>
                                : <button
                                    type="button"
                                    disabled
                                    className='bg-[#000000a8] opacity-60 px-6 py-3 rounded-3xl w-[330px] text-[#c7c7c7] text-xs'>
                                    Confirm
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </section>

            {/* Invalid OTP Portal — unchanged */}
            {InvalidPortal && createPortal((
                <div className='top-0 left-0 fixed w-screen h-screen'>
                    <div className='bottom-0 left-[21%] fixed flex justify-between items-center bg-yellow-300 px-5 py-2 rounded-t-2xl w-[850px] h-14 font-medium text-sm uppercase font[Rubik]'>
                        <h1>{InvalidMsg}</h1>
                        <button
                            onClick={() => setInvalidPortal(false)}
                            className='bg-white px-5 py-1 rounded-xl font-bold'>Close</button>
                    </div>
                </div>
            ), document.querySelector('#portal'))}
        </main>
    );
};

export default Verification;