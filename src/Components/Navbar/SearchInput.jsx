import { AutoComplete, ConfigProvider } from 'antd'
import React from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchInput = ({ options, setValue }) => {

    return (
        <div className="flex items-center border-2 bg-white shadow-3xl rounded-3xl w-full max-w-[280px] overflow-hidden self-start">
            <BiSearch className="ml-3" size={20} />
            <ConfigProvider theme={{ cssVar: true }}>
                <AutoComplete
                    style={{
                        width: 200,
                    }}
                    onChange={(e) => setValue(e)}
                    options={options}
                    placeholder="Looking for something specific?"
                    filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
            </ConfigProvider>
        </div>
    )
}

export default SearchInput