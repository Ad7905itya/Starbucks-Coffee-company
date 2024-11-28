import React from "react";
import { BiSearch } from "react-icons/bi";
import { PiUserCircle } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="pb-2 border-b-2">
      <nav className="flex justify-between items-center m-auto px-10 py-2 pt-5 max-w-[1300px]">
        <div className="flex items-center gap-14">
          <img className="w-10" src="https://www.starbucks.in/assets/icon/logo.png" alt="logo" />
          <div className="flex gap-14 text-slate-600">
            <NavLink className='hover:text-green-700' to="/">Home</NavLink>
            <NavLink className='hover:text-green-700' to="/giftCards">Gift</NavLink>
            <NavLink className='hover:text-green-700' to="/ordering">Order</NavLink>
            <NavLink className='hover:text-green-700' to="/pay">Pay</NavLink>
            <NavLink className='hover:text-green-700' to="/store-locator">Store</NavLink>
          </div>
        </div>
        <div className="flex items-center gap-20">
          <div className="flex items-center border-2 shadow-3xl rounded-3xl w-[250px]">
            <BiSearch className="ml-3" size={20} />
            <input className="px-2 py-2 rounded-3xl w-full placeholder:text-xs outline-none" type="text" placeholder="Looking for something specific?" />
          </div>
          <div>
            <PiUserCircle size={34} color="grey" fontWeight={200} />
          </div>
        </div>
      </nav>
    </header>
  )
};

export default Navbar;
