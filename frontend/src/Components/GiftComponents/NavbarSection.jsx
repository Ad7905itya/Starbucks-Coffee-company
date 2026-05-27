import React from 'react'
import NavBarGift from './NavBarGift'

const NavbarSection = ({ Active, handleClick, item, style }) => {
    return (
        <div className='flex items-center h-full'>
            {item?.subCategories?.length ?
                item.subCategories.map((sub, i) =>
                    <NavBarGift key={i} onHandler={handleClick} active={Active === sub.name ? "active-2" : "gift"} style={style}>{sub.name}</NavBarGift>) :
                item.map((children, i) => <NavBarGift key={i} style={style} onHandler={handleClick} active={Active === children ? "active-2 gift" : "gift"}>{children}</NavBarGift>)}
        </div>
    )
}

export default NavbarSection