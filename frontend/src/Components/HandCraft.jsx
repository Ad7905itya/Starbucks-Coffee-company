import React, { useEffect, useState, Suspense } from 'react';
import { fetchHandCraftData } from '../Hooks/handcraftCurations';
const HandcraftSection = React.lazy(() => import('./HandcraftSection'));

const HandCraft = () => {
    const [handCraft, setHandCraft] = useState(null);
 
    useEffect(() => {
        (async () => {
            const data = await fetchHandCraftData();
            setHandCraft(data);
        })();
    }, []);

    if (!handCraft) return null;

    return (
        <section className='m-auto px-8 max-w-[750px] lg:max-w-[1300px] h-60'>
            <h1 className='mt-16 font-bold text-[#25453d] text-2xl'>Handcraft Curations</h1>
            <div className='flex justify-between gap-3 lg:gap-0 mt-5 overflow-y-auto'>
                <Suspense fallback={<div>Loading...</div>}>
                    {handCraft.data.map(({ _id, name, images }) => (
                        <HandcraftSection key={_id} image={images.small[0].url} title={name} />
                    ))}
                </Suspense>
            </div>
        </section>
    );
};

export default HandCraft;