import { ConfigProvider, Modal } from "antd";
import React, { useState } from "react";
import { PiUserCircle } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom"
import LoginModal from "../LoginPage/LoginModal";
import { useLocalStorage } from "../../Hooks/useLocalStorage";
import SearchInput from './SearchInput'
import { options } from '../../Data/SearchOptions'

const Navbar = () => {
  const [Value, setValue] = useState('');
  const [GetValue, setGetValue] = useState('');
  const [Open, setOpen] = useState(false);
  const [isLoginUser] = useLocalStorage('User', {});

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      setGetValue(Value);
      setValue('');
    }
  }
  return (
    <header className="top-0 z-40 sticky bg-white pb-2 border-b-2">
      <nav className="flex lg:flex-row flex-col justify-between items-center gap-5 m-auto px-10 py-2 pt-0 lg:pt-5 w-full max-w-[800px] lg:max-w-[1300px]">
        <div className="flex lg:flex-row flex-col items-center gap-8 lg:gap-14">
          <img className="w-10" loading="lazy" src="https://www.starbucks.in/assets/icon/logo.png" alt="logo" />
          <div className="flex gap-14 text-slate-600">
            <NavLink className='hover:text-green-700' to="/">Home</NavLink>
            <NavLink className='hover:text-green-700' to="/giftCards">Gift</NavLink>
            <NavLink className='hover:text-green-700' to="/ordering">Order</NavLink>
            {Object.keys(isLoginUser).length ?
              <NavLink className='hover:text-green-700' to="/pay">Pay</NavLink> :
              <p className='hover:text-green-700 cursor-pointer' onClick={() => setOpen(true)}>Pay</p>}

            <NavLink className='hover:text-green-700' to="/store-locator">Store</NavLink>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col items-center gap-5 lg:gap-20 w-full lg:w-auto">
          <SearchInput
            onKeyUp={onKeyUp}
            options={options}
            setValue={setValue} />
          <div>
            <Link to={'/profile'}><PiUserCircle size={34} color="grey" fontWeight={200} /></Link>
          </div>
        </div>
      </nav>
      <ConfigProvider theme={{ cssVar: true }}>
        <Modal open={Open} footer={false} closeIcon={false} width={innerWidth > 700 ? 600 : 400}>
          <LoginModal setOpen={setOpen} />
        </Modal>
      </ConfigProvider>
    </header>
  )
};

export default Navbar;
