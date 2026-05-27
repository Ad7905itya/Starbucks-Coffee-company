import { useContext } from "react"
import { SwiperData } from "../contexts/SwiperData"

export const useSwiperData = () => {
    const {CustomizeSwiper} = useContext(SwiperData);

    return {CustomizeSwiper}
}