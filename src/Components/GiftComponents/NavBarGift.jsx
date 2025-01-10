const NavBarGift = ({ onHandler, style, active, children, id }) => {
    return (
        <div style={style} className='flex items-end bg-[100%] bg-no-repeat px-2 lg:px-6 h-full giftContainer'>
            <option value={children} className={`flex items-center px-2 h-full text-xs lg:text-sm hover:text-[#00754a] font-thin cursor-pointer font-[Rubik] transition-all ${active}`} id={id} onClick={onHandler}>{children}</option>
        </div>
    )
}

export default NavBarGift