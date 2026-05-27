import { useEffect } from "react";
import { BiCalendar } from "react-icons/bi";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"

const LoginInput = (
    {
        Header,
        id,
        type,
        placeholder,
        myValue,
        onChange,
        errors,
        onBlur,
        onInput,
        mobile,
        name,
        Password,
        isEyeOpen,
        setIsEyeOpen,
        errorPassword,
        BirthDate,
        Calendar,
        onFocus,
        color,
        ParentClass
    }) => {
    return (
        <div className={ParentClass}>
            <label className='font-medium text-xs uppercase'>{Header}</label>
            <div className='relative w-full'>
                <input
                    style={{ backgroundColor: color }}
                    type={type}
                    className='border-[#999] py-2 border-b-[1px] w-full font-medium placeholder:font-thin text-xs outline-none'
                    name={name}
                    onBlur={onBlur}
                    onInput={onInput}
                    onFocus={onFocus}
                    onClick={Calendar}
                    id={id}
                    onChange={onChange}
                    value={myValue}
                    placeholder={placeholder} />

                {errors && <p className="bg-[#efd4dc] px-3 py-[2px] text-[#d62b1f] text-[10px] tracking-wide transition-all">{errors}</p>}

                {Password && <p onClick={() => setIsEyeOpen(!isEyeOpen)} className="top-2 right-1 absolute cursor-pointer">
                    {isEyeOpen ?
                        <BsEyeFill size={18} color="#00754a" /> :
                        <BsEyeSlashFill size={18} color="#00754a" />}</p>}

                {mobile && <div className={`text-[#14141494] font-bold transition-all py-[2px] text-[12px] absolute -bottom-6 ${errors ? "-z-20" : "z-0"} left-1`}>We will send an OTP on this Mobile Number for authentication.
                </div>}

                {BirthDate && <div className={`text-[#14141494] font-bold transition-all py-[2px] text-[12px] absolute -bottom-6 ${errors ? "-z-20" : "z-0"}`}>Share your birthdate to receive a reward during that month. It can not be changed after submission.
                </div>}

                {BirthDate && <div onClick={Calendar} className={`text-[#096] font-bold transition-all py-[2px] text-[12px] absolute top-2 right-1 cursor-pointer`}><BiCalendar size={18} /></div>}

                {Password && <div className="-bottom-8 absolute flex items-center gap-2">
                    <div>
                        <span className={`${!errorPassword.character ? "bg-[#f9f9f9]" : errorPassword.character !== "pass" ? "text-[#d62b1f] bg-[#efd4dc]" : "text-[#096] bg-[#e6edeb]"} px-2 py-1 text-xs`}>8 Characters</span>
                    </div>
                    <div className="bg-[#f9f9f9]">
                        <span className={`${!errorPassword.uppercase ? "bg-[#f9f9f9]" : errorPassword.uppercase !== "pass" ? "text-[#d62b1f] bg-[#efd4dc]" : "text-[#096] bg-[#e6edeb]"} px-2 py-1 text-xs`}>1 Uppercase</span>
                    </div>
                    <div className="bg-[#f9f9f9]">
                        <span className={`${!errorPassword.symbol ? "bg-[#f9f9f9]" : errorPassword.symbol !== "pass" ? "text-[#d62b1f] bg-[#efd4dc]" : "text-[#096] bg-[#e6edeb]"} px-2 py-1 text-xs`}>1 Symbol</span>
                    </div>
                    <div className="bg-[#f9f9f9]">
                        <span className={`${!errorPassword.number ? "bg-[#f9f9f9]" : errorPassword.number !== "pass" ? "text-[#d62b1f] bg-[#efd4dc]" : "text-[#096] bg-[#e6edeb]"} px-2 py-1 text-xs`}>1 Numeric</span>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default LoginInput