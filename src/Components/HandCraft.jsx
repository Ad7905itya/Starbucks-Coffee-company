import HandcraftSection from './HandcraftSection'
import { Handcraft } from '../Data/HandcraftCurations'

const HandCraft = () => {
    return (
        <section className='m-auto max-w-[1440px] h-60'>
            <h1 className='mt-16 ml-28 font-bold text-2xl'>Handcraft Curations</h1>
            <div className='flex justify-center gap-28 mt-5'>
                {Handcraft.map((item) => <HandcraftSection key={item.id} image={item.image} title={item.title} />)}
            </div>
        </section>
    )
}

export default HandCraft