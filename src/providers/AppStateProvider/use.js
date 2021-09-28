import { useContext } from 'react'
import AppContext from './context'

export function useAppState() {
    return useContext(AppContext)
}
