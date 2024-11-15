import React from "react";
import { BiSearch } from "react-icons/bi";
import { PiUserCircle } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b-2 pb-2">
      <nav className="flex max-w-[1440px] m-auto items-center justify-between py-3 pt-6 px-10">
        <div className="flex gap-14 items-center">
          <img className="w-10" src="https://www.starbucks.in/assets/icon/logo.png" alt="logo" />
          <div className="flex gap-14 text-slate-600">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/giftCards">Gift</NavLink>
            <NavLink to="/ordering">Order</NavLink>
            <NavLink to="/pay">Pay</NavLink>
            <NavLink to="/store-locator">Store</NavLink>
          </div>
        </div>
        <div className="flex items-center gap-20">
          <div className="flex items-center border-2 rounded-3xl shadow-3xl w-[235px]">
            <BiSearch className="ml-3" size={20} />
            <input className="py-2 px-2 w-full rounded-3xl outline-none placeholder:text-xs" type="text" placeholder="Looking for something specific?" />
          </div>
          <div>
            <PiUserCircle size={34} />
          </div>
        </div>
      </nav>
    </header>
  )
};

export default Navbar;
