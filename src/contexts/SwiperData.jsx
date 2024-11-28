import { createContext } from 'react'

export const SwiperData = createContext();

const ContextSwiper = ({children}) => {
    return (
        <SwiperData.Provider value={['hii']}>
            {children}
        </SwiperData.Provider>
    )
}

export default ContextSwiper