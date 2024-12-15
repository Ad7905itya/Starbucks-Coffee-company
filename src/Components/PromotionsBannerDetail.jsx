import React, { useState } from 'react'
import StarBoxContent from './StarBoxContent'
import { ConfigProvider, Modal } from 'antd'
import LoginModal from './LoginPage/LoginModal'

const PromotionsBannerDetail = () => {
    const [Open, setOpen] = useState(false);
    return (
        <main>
            <section className='m-auto max-w-[1240px]'>
                <p className='py-4 font-thin text-slate-600 text-sm'>{'Home > Promotions'}</p>
            </section>
            <section>
                <img loading='lazy' src="https://preprodtsbstorage.blob.core.windows.net/cms/uploads/Banner_1_d3f7563c9c.png" alt="" />
                <div className='m-auto py-5 max-w-[1240px]'>
                    <h1 className='mt-6 mb-12 font-[Rubik] font-medium text-[#213e36] text-2xl'>Starbucks Beverage Subscriptions</h1>
                    <div className='flex flex-col gap-5 font-[Rubik] text-[#444] text-sm'>
                        <p>Starbucks Beverage Subscriptions are Back! Dive Back in and Enjoy Your Favourite Core Beverages* at a Special Price.</p>
                        <p>Simply secure your beverage subscription on your Starbucks mobile app on or before 31st December 2024 and redeem your beverages within 30 days from the date of subscription.</p>
                        <p>After successful payment, the specified number of beverages will be added to your account. You can view these beverages under the "Pay/ Rewards" section of the mobile app.</p>
                        <p className='text-[#00b050]'>Book your subscription Today!</p>
                    </div>
                    <div className='flex justify-center mt-10'>
                        <button onClick={()=> setOpen(true)} className='bg-[#00754a] hover:bg-[#1e3932] px-28 py-2 rounded-3xl font-bold text-[12px] text-white'>Login To view offers</button>
                    </div>
                </div>
                <div className="border-gray-300 border-b-2">
                    <h1 className="m-auto mt-2 py-4 max-w-[1240px] font-[600] font-[sans-serif] text-2xl">Terms & Conditions</h1>
                </div>
                <div className='m-auto py-5 max-w-[1240px]'>
                    <div className='flex flex-col gap-8 my-4 mb-12'>
                        <StarBoxContent>Offer name – Offer for Beverage Subscription at Starbucks.</StarBoxContent>

                        <StarBoxContent>Offer end date- 31st Dec 2024</StarBoxContent>

                        <StarBoxContent>To avail the offer a member must present & scan their eligible registered Starbucks Rewards Card (physical or via the Starbucks India App or WhatsApp) at the time of billing.</StarBoxContent>

                        <StarBoxContent>Redemption duration – 30 days from the date of purchase of beverage subscription</StarBoxContent>

                        <StarBoxContent>By entering the ‘Offer for Beverage Subscription at Starbucks India.’ Customer agree to the following terms and conditions.</StarBoxContent>

                        <StarBoxContent>Select Starbucks Rewards members across cities who receive the offer communication from Starbucks India will only be eligible for the offer.</StarBoxContent>

                        <StarBoxContent>The Starbucks Rewards members who received the offer communication can purchase the subscription plan only via mobile app of Starbucks India.</StarBoxContent>

                        <StarBoxContent>  Beverage redemptions from availed subscription plan is valid only on Picco/Short/Tall core beverages.</StarBoxContent>

                        <StarBoxContent>Redemptions from availed subscription plan is valid against core beverages.</StarBoxContent>

                        <StarBoxContent>No Redemption against ready-to-drink/Limited-time offer drink.</StarBoxContent>

                        <StarBoxContent>No extension in offer redemption will be provided under any circumstances</StarBoxContent>

                        <StarBoxContent>Any unused beverages from your subscription will not be carried forward and will be considered as lapsed once the subscription expires.</StarBoxContent>

                        <StarBoxContent>No two offers can be clubbed in the same bill.</StarBoxContent>

                        <StarBoxContent>Once subscription offer is availed, it cannot be transferred, substituted and / or exchanged for cash or with other articles or returned.</StarBoxContent>

                        <StarBoxContent>Customizations & Size upgrades are not included in redemption. Members will need to pay separately for the same.</StarBoxContent>

                        <StarBoxContent>The terms and conditions of the “Offer for Beverage Subscription at Starbucks India” shall be in addition to and not in substitution/derogation to the Primary Terms and Conditions of Tata Starbucks.</StarBoxContent>
                    </div>
                </div>
                <ConfigProvider theme={{ cssVar: true }}>
                    <Modal open={Open} footer={false} closeIcon={false} width={600}>
                        <LoginModal setOpen={setOpen} />
                    </Modal>
                </ConfigProvider>
            </section>
        </main>
    )
}

export default PromotionsBannerDetail