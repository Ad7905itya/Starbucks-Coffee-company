
const ModalSection = ({Data}) => {
    return (
        <div className="w-full">
            <img className="w-full" src={Data.largeImage} loading="lazy" alt="" />
            <div className="relative px-4 py-5">
            <img src="https://www.starbucks.in/assets/icon/greyleafright.svg" loading="lazy" className="top-0 right-0 absolute w-16" alt="" />
                <div className="flex flex-col items-start gap-1">
                    <img src={Data.IconImage} loading="lazy" />
                    <h1 className="font-bold text-lg">{Data.title}</h1>
                    <p className="text-slate-400 text-xs">{Data.subTitle}</p>
                </div>
                {Data.milkBoxImage? <div className="flex items-center gap-1 py-2">
                    <img src={Data.milkBoxImage} className="w-5" loading="lazy" />
                    <p className="text-[10px] uppercase">Milk</p>
                </div>: ''}
                <p className="pt-2 pb-4 text-slate-500 text-xs">{Data.description}</p>
                <h2 className="pt-2 pb-4">₹ <span className="font-bold">{Data.price}</span>.{Data.priceInCoin}</h2>
            </div>
        </div>
    )
}

export default ModalSection