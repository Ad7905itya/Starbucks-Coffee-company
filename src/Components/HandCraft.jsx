import React from 'react';
import { Handcraft } from '../Data/HandcraftCurations'
const HandcraftSection = React.lazy(() => import('./HandcraftSection'));

const HandCraft = () => {
    return (
        <section className='m-auto px-8 max-w-[750px] lg:max-w-[1300px] h-60'>
            <h1 className='mt-16 font-bold text-[#25453d] text-2xl'>Handcraft Curations</h1>
            <div className='flex justify-between gap-3 lg:gap-0 mt-5 overflow-y-auto'>
                {Handcraft.map((item) => <HandcraftSection key={item.id} image={item.image} title={item.mainCategory} />)}
            </div>
        </section>
    )
}

export default HandCraft