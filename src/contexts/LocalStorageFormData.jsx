import React, { createContext } from 'react'

export const FormContext = createContext();

const LocalStorageFormData = ({ children }) => {
    return (
        <FormContext.Provider value={'hii'}>
            {children}
        </FormContext.Provider>
    )
}

export default LocalStorageFormData