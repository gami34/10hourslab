
import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function useAppContext() {
    return useContext(AppContext)
}

export function AppProvider({ children }) {

    const [loading, setLoading] = useState(false);



    let value = {
    }

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <AppContext.Provider value={value}>
            {!loading && children}
        </AppContext.Provider>
    )
}

export default AppProvider