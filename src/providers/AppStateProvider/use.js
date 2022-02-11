import { useContext } from 'react'
import { appStateContext } from './context'

export function useAppState() {
    return useContext(appStateContext)
}
