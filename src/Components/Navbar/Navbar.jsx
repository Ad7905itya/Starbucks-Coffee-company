import { ConfigProvider, Modal } from "antd";
import React, { useState } from "react";
import { PiUserCircle } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import LoginModal from "../LoginPage/LoginModal";
import SearchInput from "./SearchInput";

const Navbar = () => {
  const [Open, setOpen] = useState(false);
  return (
    <header className="top-0 z-10 sticky bg-white pb-2 border-b-2">
      <nav className="flex justify-between items-center m-auto px-10 py-2 pt-5 max-w-[1300px]">
        <div className="flex items-center gap-14">
          <img className="w-10" loading="lazy" src="https://www.starbucks.in/assets/icon/logo.png" alt="logo" />
          <div className="flex gap-14 text-slate-600">
            <NavLink className='hover:text-green-700' to="/">Home</NavLink>
            <NavLink className='hover:text-green-700' to="/giftCards">Gift</NavLink>
            <NavLink className='hover:text-green-700' to="/ordering">Order</NavLink>
            <p className='hover:text-green-700 cursor-pointer' onClick={() => setOpen(true)}>Pay</p>
            <NavLink className='hover:text-green-700' to="/store-locator">Store</NavLink>
          </div>
        </div>
        <div className="flex items-center gap-20">
          <SearchInput placeholder="Looking for something specific?" />
          <div>
            <Link to={'/profile'}><PiUserCircle size={34} color="grey" fontWeight={200} /></Link>
          </div>
        </div>
      </nav>
      <ConfigProvider theme={{cssVar: true}}>
        <Modal open={Open} footer={false} closeIcon={false} width={600}>
          <LoginModal setOpen={setOpen} />
        </Modal>
      </ConfigProvider>
    </header>
  )
};

export default Navbar;
