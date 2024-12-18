import { useEffect, useState } from "react"

export function useSessionStorage(key, initialData) {
    const [Data, setData] = useState(initialData);

    useEffect(() => {
        const existingData = JSON.parse(sessionStorage.getItem(key))
        if (existingData) {
            setData(existingData)
        } else {
            setData(initialData)
            sessionStorage.setItem(key, JSON.stringify(initialData))
        }
    }, [])

    const updateSessionStorage = (newData) => {
        if (typeof newData === 'function') {
            sessionStorage.setItem(key, JSON.stringify(newData(Data)))
        } else {
            sessionStorage.setItem(key, JSON.stringify(newData))
        }

        setData(newData)
    }

    return [Data, updateSessionStorage]
}