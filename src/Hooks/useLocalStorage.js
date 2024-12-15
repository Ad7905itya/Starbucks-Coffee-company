import { useEffect, useState } from "react"

export function useLocalStorage(key, initialData) {
    const [Data, setData] = useState(initialData);

    useEffect(() => {
        const existingData = JSON.parse(localStorage.getItem(key))
        if (existingData) {
            setData(existingData)
        } else {
            setData(initialData)
            localStorage.setItem(key, JSON.stringify(initialData))
        }
    }, [])

    const updateLocaleStorage = (newData) => {
        if (typeof newData === 'function') {
            localStorage.setItem(key, JSON.stringify(newData(Data)))
        } else {
            localStorage.setItem(key, JSON.stringify(newData))
        }

        setData(newData)
    }

    return [Data, updateLocaleStorage]
}