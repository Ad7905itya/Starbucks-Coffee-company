import React, { useEffect, useState } from 'react'
import NavbarSection from '../GiftComponents/NavbarSection'
import Cards from './Cards';
import NotFoundCards from './NotFoundCards';

const CardsSection = ({ CategoryData }) => {
    const [Active, setActive] = useState(CategoryData.subCategories[0].name);
    const [FilterItems, setFilterItems] = useState(CategoryData.subCategories.filter((item) => item.name === Active)[0]);
    const [FilterTags, setFilterTags] = useState([]);
    const [ActiveTag, setActiveTag] = useState([]);

    useEffect(() => {
        setActive(CategoryData.subCategories[0].name);
        setActiveTag([]);
    }, [CategoryData])

    useEffect(() => {
        setFilterItems(CategoryData?.subCategories?.filter((item) => item.name === Active)[0])
        setFilterTags(CategoryData?.subCategories?.filter((item) => item.name === Active)[0]?.filtersData);
    }, [Active])

    const onTagHandler = (tag) => {
        setActiveTag((prevTags) =>
            prevTags.includes(tag)
                ? prevTags.filter((t) => t !== tag) // Remove tag if it's active
                : [...prevTags, tag] // Add tag if it's not active
        );
    };

    const OnHandler = (e) => {
        const input = e.target.innerText
        setFilterItems(CategoryData.subCategories.filter((item) => item.name === e.target.innerText)[0])
        setActive(input);
    }
    return (
        <main>
            <section className='flex justify-between items-center border-[#e0e0e08b] border-b-2'>
                {CategoryData.subCategories.length > 1 &&
                    <div className='flex justify-between items-center m-auto w-full max-w-[800px] lg:max-w-[1260px] h-16'>
                        <img className='w-16 h-16' src="https://www.starbucks.in/assets/icon/left-icon.svg" alt="left" loading='lazy' />
                        <div className='flex flex-grow items-center h-full overflow-y-auto'>
                            <NavbarSection handleClick={OnHandler} Active={Active} style={{ padding: '4px 5px', color: '#00000094' }} item={CategoryData} />
                        </div>
                        <img className='w-16 h-16' src="https://www.starbucks.in/assets/icon/right-icon.svg" alt="right" loading='lazy' />
                    </div>}
            </section>

            {FilterTags && <section className='border-[#e4e4e4] border-b-2'>
                <div className='flex items-center gap-4 m-auto px-4 max-w-[1240px]'>
                    <img src="https://www.starbucks.in/assets/icon/Union.svg" loading='lazy' alt="" />
                    <div className='flex items-center gap-4 px-5 py-2 overflow-y-auto'>
                        {FilterTags?.map((item, i) => <span onClick={() => onTagHandler(item.tag.toLowerCase())}
                            className={`bg-[#ebebeb] px-6 py-2 rounded-lg font-[Rubik] text-[#3c3c3c] text-nowrap text-xs hover:text-[#00804c] cursor-pointer ${ActiveTag.includes((item.tag.toLowerCase())) ? 'active-3' : ''}`} key={i}>{item.tag}</span>)}
                    </div>
                </div>
            </section>}

            {/* Filter name and description components */}
            <section className='flex flex-wrap items-center gap-4 m-auto p-4 max-w-[1240px]'>
                <div className='flex flex-col gap-2 mt-3'>
                    <h1 className='font-bold text-lg'>{FilterItems ? FilterItems.name : CategoryData.subCategories[0].name}</h1>
                    <p className='text-[#00000094] text-sm'>{FilterItems ? FilterItems.description : CategoryData.subCategories[0].description}</p>
                </div>
            </section>

            {/* Card components */}
            <section className='flex mb-20 px-8 py-14'>
                <div className='gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-auto px-5 w-full max-w-[1300px]'>
                    {ActiveTag.length ? FilterItems.items.filter((tag) => ActiveTag.includes(tag.filtersData?.toLowerCase())).map((item) => <Cards key={item.id} cardData={item} {...item} />) :
                        FilterItems?.items.filter((item) => item.parameters[0].value !== FilterItems.name).map((item, i) => <Cards key={i} cardData={item} {...item} />)}
                </div>
                {
                    ActiveTag.length ? !FilterItems?.items.filter((tag) => ActiveTag.includes(tag.filtersData?.toLowerCase())).length ? <div className='left-0 absolute px-5 w-full'><NotFoundCards /></div> : '' : ''
                }
                {
                    !ActiveTag.length ? !FilterItems?.items.filter((item) => item.parameters[0].value !== FilterItems.name).length ? <div className='left-0 absolute px-5 w-full'><NotFoundCards /></div> : '' : ''
                }
            </section>
        </main>
    )
}

export default CardsSection