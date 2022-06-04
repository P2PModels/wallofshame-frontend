import { createContext } from 'react'

const casesInitialContext = {
    loading: false,
    error: '',
    cases: [],
    refetch: () => {}
}

const CasesContext = createContext(casesInitialContext)

export default CasesContext
