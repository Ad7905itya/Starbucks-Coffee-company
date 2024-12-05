import React from 'react'

const StarBoxContent = ({children}) => {
    return (
        <div className="flex items-center gap-3">
            <div className="bg-[#f2f0eb] p-1 rounded-xl w-10 h-10">
                <img src="https://preprodtsbstorage.blob.core.windows.net/cms/uploads/Free_tall_drink_ico_65e0d97444_36d06efe43_c47f54a0d6.png" alt="" loading="lazy" />
            </div>
            <p className="font-light text-[#696a6c] text-sm">{children}</p>
        </div>
    )
}

export default StarBoxContent