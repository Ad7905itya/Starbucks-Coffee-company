import React from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchInput = ({ placeholder, value, onChange,name,id }) => {
    return (
        <div className="flex items-center border-2 bg-white shadow-3xl rounded-3xl w-full max-w-[280px] self-start">
            <BiSearch className="ml-3" size={20} />
            <input 
            className="px-2 py-1 rounded-3xl w-full placeholder:text-xs outline-none" type="text" placeholder={placeholder} 
            value={value} 
            name={name}
            id={id}
            onChange={onChange} />
        </div>
    )
}

export default SearchInput