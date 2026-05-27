import { Collapse, Typography } from 'antd'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'

const FaqData = () => {
    return (
        <Collapse
            className='bg-transparent border-none'
            accordion
            expandIcon={({ isActive }) => {
                return <FaAngleRight color='#1e3932' size={18} style={{ transform: `rotate(${isActive ? -90 : 0}deg)`,top: 20,position: "relative" }} />
            }}
            expandIconPosition='end'
            bordered={false}
        >
            <Collapse.Panel
                key={'1'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>Know more about Starbucks Rewards™ program.</div>}>
                <Typography.Text style={{color: 'gray'}}>Joining the Starbucks Rewards™ is everyone's cup of coffee. Simply sign up and earn stars as you spend via your Starbucks card, Cash, Debit/Credit Card, or UPI. There are three levels in the program: Welcome, Green, Gold. For more details, click here : https://www.starbucks.in/rewards/reward-detail to check benefits that the member will receive at the respective levels.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'2'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>How to Register and be a member of starbucks?</div>}>
                <Typography.Text style={{color: 'gray'}}>You must register to earn Starbucks rewards and redeem member offers. There are 3 ways to register: You can send a “Hi” to us on Whatsapp on +91 84540 56333 and follow the steps to register. You can go to your nearest Starbucks store and request for a Starbucks Rewards card. Post that, download the Starbucks India App or go to the Starbucks India website to register the card with your relevant details. You can also register for an e-card via the Starbucks India app without having a physical card.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'3'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>How 1 star for Rs 400 spend work?</div>}>
                <Typography.Text style={{color: 'gray'}}>You earn a star when you spend Rs. 400 in total during one or multiple transactions at Starbucks in India using your Starbucks card. If you use other payment methods, you earn a star after spending Rs. 500 in total. For example, if you spend Rs. 200 in one transaction, you earn 0.5 stars. So, spending Rs. 200 more in subsequent transactions will earn you a star once you reach Rs. 400 with your Starbucks card or Rs. 500 with other methods. It may take upto 24 hours for stars to be credited in your account.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'4'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>How do we earn stars in the case of partial payments?</div>}>
                <Typography.Text style={{color: 'gray'}}>You will earn 1 star each for Rs.400 spent for the part of the transaction where you paid using Starbucks Rewards card and 1 star each for Rs.500 spent for any balance that you settled using other payment methods. For example if your total is 1000 and you pay 400 via Starbucks card, you will earn 1 star. If you pay the balance 600 via cash, you will earn 1.2 stars (1 star for 500, 0.2 for 100)</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'5'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>Why is registration necessary?</div>}>
                <Typography.Text style={{color: 'gray'}}>To join Starbucks Rewards™, you must register through WhatsApp or the Starbucks India app. This allows us to reward you with benefits and special offers using your contact details. Registration also provides balance protection if your card is lost or stolen. A registered card lets you manage your account online and on the Starbucks India app for convenience.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'6'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>How do I earn stars?</div>}>
                <Typography.Text style={{color: 'gray'}}>As a Starbucks Rewards member in India, you earn stars by making purchases at Starbucks stores or through the Starbucks India app using any payment method—Starbucks card, Cash, Credit/Debit cards, or UPI. Spend Rs. 400 (incl. taxes) with a Starbucks card or Rs. 500 (incl. taxes) with other payment methods to earn a star. Stars are not earned on purchases via third-party or delivery platforms. Reloading your Starbucks Card does not earn stars. Stars are credited only for purchases made at Starbucks stores in India or through the Starbucks India app after registration. You can earn bonus stars by participating in special events and promotions, so keep an eye out for these offers!</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'7'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>If I lose my Starbucks Card?</div>}>
                <Typography.Text style={{color: 'gray'}}>"If your card is registered, your membership in Starbucks Rewards™ and any remaining card balance will be protected as of the time you notify us of its loss. To do this, you must log on to your www.starbucks.in account, visit the My Cards section and click on the Report Lost/Stolen link. Alternatively, you can use your Starbucks India mobile app to report your Card as Lost/Stolen. That will freeze your remaining balance at the time you reported your card as lost or stolen, and you can then transfer it to a new Starbucks Card - without any hassle or fees..</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'8'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>If Starbucks card balance is inaccurate?</div>}>
                <Typography.Text style={{color: 'gray'}}>In such cases, you can perform a Balance Inquiry online, at a Starbucks store in India, or check your Balance Inquiry receipt. If you still feel that the balance is inaccurate, please call the Customer Care Centre at 18602660010 or send an email to: customercare@tatastarbucks.com for assistance.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'9'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>When does rewards get loaded?</div>}>
                <Typography.Text style={{color: 'gray'}}>All rewards will be loaded onto your account within 24 to 48 business hours from the time you upgrade or downgrade from levels.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'10'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>Do my stars expire?</div>}>
                <Typography.Text style={{color: 'gray'}}>Yes. After registering, you have one year to accumulate stars to reach the Green level or the Gold level. If you earn less than the necessary amount of stars for each level, your star count will be reset to zero on your anniversary date. The star count will also reset to zero once you attain or retain the Gold level.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'11'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>How tier level and reset stars work?</div>}>
                <Typography.Text style={{color: 'gray'}}>When you earn 0-4 stars, you remain in the Welcome tier. On your 5th star, you are promoted to the Green tier and on the 25th star, you become a Gold member. When you become a Gold member, your stars reset to zero. On earning ten stars as a Gold member you unlock your free beverage and your stars reset once again. Each tier level's benefits are valid for one year. In case, you are not active for a year, you will be moved to the previous tier. For example, Green members will move to the Welcome tier. Welcome tier members remain in Welcome.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'12'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>What are Bonus Stars?</div>}>
                <Typography.Text style={{color: 'gray'}}>During the program, members may get several opportunities to earn additional stars on promotional beverages and other offers/rewards that may be run by Starbucks India.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'13'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>Where can I find my rewards?</div>}>
                <Typography.Text style={{color: 'gray'}}>When you log into your account online or on Starbucks India mobile app, you will be able to see all the rewards you have earned at your level when you click on the tier strip at the first screen of app or you can scan your SR card at any store and the Barista will tell you the status of your rewards. You can also view your available offers or reward status on Whatsapp. This recognition is presented in the form of stars or rewards earned.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'14'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>How to maintain Green level status?</div>}>
                <Typography.Text style={{color: 'gray'}}>Once you reach the Green level, you will be at that level for a full year from the date you qualified. Simply earn 5 additional stars before your anniversary date (the date you earned Green) and you will continue to enjoy Green level benefits for another year. If you do not earn the necessary stars you will move back to the Welcome level and your stars will be reset to 0.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'15'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>Do Starbucks store personal information?</div>}>
                <Typography.Text style={{color: 'gray'}}>Please read our Privacy Policy for details.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'16'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>Is there a membership fee ?</div>}>
                <Typography.Text>There is no membership fee at any level to join Starbucks Rewards™ program.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'17'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>Why do you have expiration dates on rewards?</div>}>
                <Typography.Text style={{color: 'gray'}}>We want to encourage members to use rewards, and so maintain expiration dates. As our most loyal customers, we want you to enjoy all your rewards because you deserve that free hand-crafted beverage and customization.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'18'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>Does tier benefit pass to my all Starbucks Card?</div>}>
                <Typography.Text style={{color: 'gray'}}>Your stars and benefits are at the account/benefits level, so once you’ve qualified for the respective level benefits for the first time, all cards registered to your account automatically qualify.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'19'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>Can I qualify for multiple years in a single year spend?</div>}>
                <Typography.Text style={{color: 'gray'}}>Every year on your anniversary date (the date you qualified for the Gold level), our system will look back and confirm whether or not you have earned the minimum 25 stars during that timeframe. If so, you'll remain at the Gold level for another year. You can only qualify for 1 year at a time and earning more than the necessary stars does not make you eligible for the Gold level for multiple years.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'20'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>What if I haven’t used my Birthday Reward?</div>}>
                <Typography.Text style={{color: 'gray'}}>You will receive only one birthday reward in the month of your birthday as long as you have spent Rs 600 since you became a member. Any unused Birthday Reward will not be carried forward to the following year.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'21'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>Can I redeem multiple rewards at one time?</div>}>
                <Typography.Text style={{color: 'gray'}}>Yes. You can redeem multiple rewards that you have in your account at a single time as long as they are within the expiry period.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'22'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>Can I redeem multiple offers on the same beverage?</div>}>
                <Typography.Text style={{color: 'gray'}}>You cannot redeem multiple offers available to you on the same beverage.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'23'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>How do I redeem the offers?</div>}>
                <Typography.Text style={{color: 'gray'}}>Inform the store partner that you’d like to redeem your reward and present one of your registered Starbucks Cards or use your Starbucks India mobile app.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'24'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>How are stars calculated?</div>}>
                <Typography.Text style={{color: 'gray'}}>The stars accumulated will be calculated annually on your anniversary date (the date you qualified for the current level of membership) to determine the level of membership you are in. Stars accumulated will be calculated independently each year.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'25'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>Do I have to bring my card to earn stars?</div>}>
                <Typography.Text style={{color: 'gray'}}>While it is necessary to scan your Starbucks Rewards membership barcode at the store to earn stars, you do not need to bring your physical card, if the same card is registered in the app. Stars can be earned using your registered digital card on the Starbucks India app or through WhatsApp, regardless of the payment method you use.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'26'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>How to maintain Gold level status?</div>}>
                <Typography.Text style={{color: 'gray'}}>Once you reach the Gold level, you will be at that level for a full year from the date you qualified. Simply earn 25 additional stars before your anniversary date (the date you earned Gold) and you will continue to enjoy Gold level benefits for another year. If you do not earn the necessary stars you will move back to the Green level and your stars will be reset to 0.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'27'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>Are stars earned transferable?</div>}>
                <Typography.Text style={{color: 'gray'}}>Stars collected in each account can only be used by that account holder and cannot be transferred to another account.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'28'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>Can I redeem two customisations?</div>}>
                <Typography.Text style={{color: 'gray'}}>You cannot redeem two customizations on the same beverage. However, you can redeem it on two different beverages in the same transaction or on different transactions.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'29'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>How to refer Starbucks Rewards™ program?</div>}>
                <Typography.Text style={{color: 'gray'}}>Yes. You can refer the Starbucks Rewards™ program to a friend. The process for the referral is as below: For App: Login to your account on the Starbucks India app Click on the settings option on the right of the screen Click on ‘Refer your Friend Option’. You will see a code displayed. Click on ‘Share My Code’ and choose the medium through which you would like to share your code. Please Note: A user can get a maximum of 5 Bonus Stars each month. i.e The maximum times the code can be shared each month is 5 times.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'30'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>What is referral reward benefit?</div>}>
                <Typography.Text style={{color: 'gray'}}>On referral, the referrer will earn 1 Bonus Star only when the referred customer successfully registers to the My Starbucks Rewards™ program.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'31'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>Will I earn any stars and reward on purchasing an eGift Card?</div>}>
                <Typography.Text style={{color: 'gray'}}>No stars or rewards are earned on an eGift card purchase. However, you are eligible to earn stars while spending the amount from a Gift card linked to your Starbucks Rewards™ account.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'32'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>If Starbucks card balance is inaccurate?</div>}>
                <Typography.Text style={{color: 'gray'}}>In such cases, you can perform a Balance Inquiry online, at a Starbucks store in India, or check your Balance Inquiry receipt. If you still feel that the balance is inaccurate, please call the Customer Care Centre at 18602660010 or send an email to: customercare@tatastarbucks.com for assistance.</Typography.Text>
            </Collapse.Panel>
            <Collapse.Panel
                key={'33'}
                header={<div className='py-5 font-bold text-[#1e3932] text-base'>Do I have to register my e-Gold Card?</div>}>
                <Typography.Text style={{color: 'gray'}}>Your e-Gold Card has been pre-registered to your account and you may transfer funds from one of your cards or reload value to your e-Gold Card.</Typography.Text>
            </Collapse.Panel>
        </Collapse>
    )
}

export default FaqData