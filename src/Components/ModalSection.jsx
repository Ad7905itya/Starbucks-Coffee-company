const ModalSection = ({ detail, Data }) => {
    return (
        <div className="w-full">
            <img className="w-full" src={Data.largeImage || Data.BannerImg} loading="lazy" alt="" />
            <div className="relative px-4 py-5 h-full">
                {detail()}
            </div>
            <img src="https://www.starbucks.in/assets/images/dots_gold.svg" loading="lazy" className="bottom-0 left-0 absolute w-8" alt="" />
        </div>
    )
}

export default ModalSection