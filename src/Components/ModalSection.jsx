import ModalData from "./Orders/ModalData"

const ModalSection = ({ detail, Data, modalImg }) => {
    return (
        <div className="w-full">
            <div className="flex justify-center items-center max-h-[250px] overflow-hidden">
                <img className="w-full min-h-[220px]" src={modalImg} loading="lazy" alt="" />
            </div>
            <div className="relative px-4 py-5 h-full">
                {Data && <img src={Data.images?.sampleImage} loading='lazy' alt="" />}
                {detail ? detail() : (
                    <div>
                        <img src="https://www.starbucks.in/assets/icon/greyleafright.svg" loading="lazy" className="top-0 right-0 absolute w-16" alt="" />
                        <img src="https://www.starbucks.in/assets/icon/greyleafright.svg" loading="lazy" className="top-0 right-0 absolute w-12 lg:w-16" alt="" />
                        <div className="flex flex-col items-start gap-1 mb-2">
                            <img src={Data.iconImage} loading="lazy" />
                            <h1 className="font-bold text-lg">{Data.title}</h1>
                            <p className="text-slate-400 text-xs">{Data.strength}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            {Data.grain && Data.grain.map((item, i) => <ModalData key={i} grainData={item} />)}
                        </div>

                        <p className="pt-2 pb-4 text-slate-500 text-xs">{Data.description}</p>
                        <h2 className="pt-2 pb-10 font-medium">₹{Data.price}.<span className="text-xs">{Data.paisa}</span></h2>
                    </div>
                )}
            </div>
            <img src="https://www.starbucks.in/assets/images/dots_gold.svg" loading="lazy" className="bottom-0 left-0 absolute w-8" alt="" />
        </div>
    )
}

export default ModalSection