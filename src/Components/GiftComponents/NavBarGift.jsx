const NavBarGift = ({ onHandler, active, children, id }) => {
    return (
        <div style={{ backgroundImage: 'url(https://www.starbucks.in/media/lineSeparator1-NQWR4CXV.png)' }} className='flex items-end bg-[100%] bg-no-repeat px-2 lg:px-6 h-full giftContainer'>
            <option value={children} className={`flex items-center px-2 h-full text-xs lg:text-sm hover:text-[#00754a] font-thin font-[Rubik] transition-all ${active} gift`} id={id} onClick={onHandler}>{children}</option>
        </div>
    )
}

export default NavBarGift