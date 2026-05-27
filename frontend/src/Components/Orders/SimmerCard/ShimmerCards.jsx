import React from 'react'

const ShimmerCards = () => {
    return (
        <div className="flex items-start gap-4 bg-[#f9f9f9] shadow-5xl hover:shadow-HoverShadow py-4 pr-0 pl-2 rounded-lg min-h-[232px]">
            <div className='flex-shrink-0 bg-[#ccc] rounded-full w-[96px] h-[96px] animate-pulse cursor-pointer overflow-hidden'>
            </div>

            <div className='flex flex-col justify-between p-3 pt-0 pl-0 w-full h-full'>
                <div>
                    <h2 className='bg-[#ccc] mt-1 mb-3 rounded-lg w-[30%] min-h-6 font-bold text-sm animate-pulse'></h2>
                    <p className='bg-[#ccc] opacity-45 rounded-lg w-[80%] min-h-4 text-[10px] animate-pulse'></p>

                    <p className='bg-[#ccc] opacity-65 mt-2 rounded-lg min-h-5 text-xs animate-pulse'></p>
                </div>

                <div className='flex justify-between'>
                    <p className='font-bold'></p>
                </div>
            </div>

        </div>
    )
}

export default ShimmerCards