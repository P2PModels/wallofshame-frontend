import CasesContext from './context'
import { useQuery } from '@apollo/client'
import { GET_CASES } from '../../services/cases_subgraph/queries'

export function CasesProvider({ children }) {
    const { data, loading, error, refetch: refetchFn } = useQuery(GET_CASES)

    const cases = data ? data.cases : []

    return (
        <CasesContext.Provider value={{ loading, error, cases, refetch: () => refetchFn(GET_CASES) }}>
            {children}
        </CasesContext.Provider>
    )
}
