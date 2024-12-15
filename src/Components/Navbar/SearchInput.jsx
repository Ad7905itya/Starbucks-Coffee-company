import React from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchInput = ({placeholder}) => {
    return (
        <div className="flex items-center border-2 bg-white shadow-3xl rounded-3xl w-full">
            <BiSearch className="ml-3" size={20} />
            <input className="px-2 py-1 rounded-3xl w-full placeholder:text-xs outline-none" type="text" placeholder={placeholder} />
        </div>
    )
}

export default SearchInput