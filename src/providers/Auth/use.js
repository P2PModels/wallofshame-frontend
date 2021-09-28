import { useContext } from 'react'
import { authContext } from './context'

export default function useAuth() {
    return useContext(authContext)
}
