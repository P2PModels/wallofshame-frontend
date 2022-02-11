import React, { useState } from 'react'
import { appStateContext } from './context'

function useAppStateProvider() {
    // Set initial value of region and create state
    const [region, setRegion] = useState('spain')

    return {
        region,
        setRegion,
    }
}

export function AppStateProvider({ children }) {
    const appState = useAppStateProvider()
    return (
        <appStateContext.Provider value={appState}>
            {children}
        </appStateContext.Provider>
    )
}
