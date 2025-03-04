import { AutoComplete, ConfigProvider } from 'antd'
import React from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchInput = ({ options, setValue, onKeyUp }) => {

    return (
        <div className="flex items-center self-start bg-white shadow-3xl border-2 rounded-3xl w-full max-w-[280px] overflow-hidden">
            <BiSearch className="ml-3" size={20} />
            <ConfigProvider theme={{ cssVar: true }}>
                <AutoComplete
                    style={{
                        width: 200,
                    }}
                    onChange={(e) => setValue(e)}
                    onKeyUp={onKeyUp}
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