import { useContext } from 'react'
import CasesContext from './context'

export default function useCases() {
    return useContext(CasesContext)
}
