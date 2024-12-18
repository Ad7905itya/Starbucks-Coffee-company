import React, { useState } from "react"
import { CustomizeSwiper } from "./Home"
import { SwiperSlide } from "swiper/react"
import { RewardsData } from "../Data/RewardsData"
import { Helmet } from "react-helmet-async"
const Reward = React.lazy(() => import('./Reward'));
const FaqData = React.lazy(() => import('./FaqData'));
const StarBoxContent = React.lazy(() => import('./StarBoxContent'));

const StarbucksRewards = () => {
  const [Open, setOpen] = useState(false);
  return (
    <>
      <Helmet>
        <title>Rewards & Loyalty | Tata StarBucks</title>
      </Helmet>
      <main>
        <p className='m-auto my-2 px-8 max-w-[1240px] font-thin text-slate-600 text-sm'>{'Home > Starbucks Rewards'}</p>
        <CustomizeSwiper
          isOpen={false}
          slide={1}
          spaceBetween={20}
          className="m-auto w-[1240px] h-full mySwiper">
          {RewardsData.map((item, i) =>
            <SwiperSlide key={i}>
              <Reward key={i} Data={item} />
            </SwiperSlide>)}
        </CustomizeSwiper>
        <section>
          <div className="border-gray-300 border-b-2">
            <h1 className="m-auto my-2 px-8 py-4 max-w-[1240px] font-[600] font-[sans-serif] text-2xl">How to collect Stars</h1>
          </div>
          <div className="flex flex-col gap-8 m-auto my-2 px-8 py-5 max-w-[1240px] transition-all">
            <StarBoxContent>
              Create an account to get access to full range of Starbucks Rewards Benefits
            </StarBoxContent>
            <StarBoxContent>
              Earn a star on every Rs. 400 spent using Starbucks Card
            </StarBoxContent>
            <StarBoxContent>
              Earn a star on every Rs. 500 spent using Cash, Debit/Credit, or UPI
            </StarBoxContent>
            <div className={`flex-col gap-8 ${Open ? 'flex' : 'hidden'}`}>
              <StarBoxContent>
                As you earn stars, you can redeem them for rewards—like free drinks, and more when you annually spend Rs 600 or more.
              </StarBoxContent>
              <StarBoxContent>
                Enjoy the convenience of in-store mobile ordering and pick up
              </StarBoxContent>
              <StarBoxContent>
                Collect Stars effortlessly, however you pay - Rewards just got easier!
              </StarBoxContent>
            </div>
          </div>
          <div className="flex justify-center m-auto my-5 px-8 max-w-[1240px]">
            <button onClick={() => Open ? setOpen(false) : setOpen(true)} className="bg-black px-12 py-3 rounded-3xl font-bold text-white text-xs">
              {`Learn ${Open ? 'Less' : 'More'}`}</button>
          </div>
          <div className="border-gray-300 mt-5 border-b-2">
            <div className="flex justify-between items-center m-auto my-8 px-8 max-w-[1240px]">
              <h1 className="font-[600] font-[sans-serif] text-2xl">FAQ</h1>
              <p className='font-bold text-[#00754a] text-sm cursor-pointer'>View All</p>
            </div>
          </div>
        </section>
        <section className="m-auto my-3 px-8 max-w-[1240px]">
          <FaqData />
        </section>
      </main>
    </>
  )
}

export default StarbucksRewards