import CasesContext from './context'
import { useQuery } from '@apollo/client'
import { GET_CASES } from '../../services/cases/queries'

export function CasesProvider({ children }) {
    const { data, loading, error } = useQuery(GET_CASES)

    const cases = data ? data.cases : {}

    return (
        <CasesContext.Provider value={{ loading, error, cases }}>
            {children}
        </CasesContext.Provider>
    )
}
