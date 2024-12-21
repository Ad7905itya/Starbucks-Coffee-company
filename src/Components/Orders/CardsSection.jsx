import React, { useState } from 'react'
import Cards from './Cards'
import Filters from './Filters'

const CardsSection = ({ CategoryData }) => {
    const [Filter, setFilter] = useState([]);

    const onClick = (e) => {
        const InputValue = e.target.innerText;
        if (Filter.findIndex((item) => item === InputValue) === -1) {
            setFilter(prev => [...prev, InputValue]);
        } else {
            Filter.splice(Filter.findIndex((item) => item === InputValue), 1);
            setFilter(Filter);
        }
    }
    return (
        <>
            {CategoryData.filterByRoast && <section className='border-gray-400 px-8 border-b-[1px]'>
                <div className='flex items-center gap-5 m-auto py-2 max-w-[800px] lg:max-w-[1240px]'>
                    <img src="https://www.starbucks.in/assets/icon/Union.svg" loading='lazy' alt="" />
                    {CategoryData.filterByRoast.map((item, i) =>
                        <Filters key={i} onClick={onClick} Data={item} />)}
                </div>
            </section>}
            <section className='m-auto px-8 py-8 max-w-[800px] lg:max-w-[1280px] font-[Rubik]'>
                <h1>{CategoryData.category}</h1>
                <p className='mt-2 font-thin text-sm'>{CategoryData.define}</p>
                {CategoryData.cards ? <div className='flex'>
                    <div className='gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 w-full'>
                        {CategoryData.cards.map((CardItem, i) => <Cards key={i} cardData={CardItem} />)}
                    </div>
                </div> : ''}
            </section>
        </>
    )
}

export default CardsSection