import ModalData from "./Orders/ModalData"

const ModalSection = ({
    Data,
    detail,
    isHome,
    name,
    images,
    veg,
    dietaryInformation,
    description,
    basePrice,
    productIngredientsOptions
}) => {
    return (
        <div className="w-full">
            <div className="flex justify-center items-center max-h-[250px] overflow-hidden">
                <img className="w-full min-h-[220px]" src={images.medium?.[0].url || images} loading="lazy" alt="" />
            </div>
            <div className="relative px-6 pt-12 pb-8 h-full">
                {!Data?.isGiftCard && veg ? <img src={'https://www.starbucks.in/assets/icon/veg.svg'} loading='lazy' alt="" /> : <img src={'https://www.starbucks.in/assets/icon/nonveg.svg'}
                    loading='lazy' alt="" />}
                {isHome ? detail() : (
                    <div>
                        <img src="https://www.starbucks.in/assets/icon/greyleafright.svg" loading="lazy" className="top-0 right-0 absolute w-16" alt="" />
                        <img src="https://www.starbucks.in/assets/icon/greyleafright.svg" loading="lazy" className="top-0 right-0 absolute w-12 lg:w-16" alt="" />
                        <div className="flex flex-col items-start gap-1 mb-2">
                            <h1 className="font-bold text-lg">{name}</h1>
                            <p className="text-slate-400 text-xs">{dietaryInformation}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {productIngredientsOptions.dark.map((item, i) => <ModalData key={i} title={item.title} img={item.iconUrl} />)}
                        </div>

                        <p className="pt-2 pb-4 text-slate-500 text-xs">{description}</p>
                        <h2 className="pt-2 pb-10 font-medium">₹{basePrice.toFixed(2)}</h2>
                    </div>
                )}
            </div>
            <img src="https://www.starbucks.in/assets/images/dots_gold.svg" loading="lazy" className="bottom-0 left-0 absolute w-8" alt="" />
        </div>
    )
}

export default ModalSection