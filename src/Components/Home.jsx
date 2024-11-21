import HandCraft from './HandCraft';
import SwiperSection from './SwiperSection';

const Home = () => {
    return (
        <main>
            <section className='bg-[#1e3932] px-5 font-[sans-serif] text-white cursor-pointer'>
                <div className='flex justify-between items-center m-auto px-8 w-full max-w-[1440px] h-20'>
                    <h5 className='font-thin text-lg tracking-widest'>StarBucks</h5>
                    <p className='border-2 border-white px-3 py-2 rounded-3xl text-xs'>Know More</p>
                </div>
            </section>
            <SwiperSection />
            <HandCraft />
        </main>
    )
}

export default Home