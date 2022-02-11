import { createContext } from 'react'

const casesInitialContext = {
    loading: true,
    error: '',
    cases: {},
}

const CasesContext = createContext(casesInitialContext)

export default CasesContext
