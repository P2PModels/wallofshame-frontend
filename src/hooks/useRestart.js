import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { RESTART } from '../services/cases_backend/queries'

export default function useRestart() {
    const [ data, setData ] = useState()
    const [ loading, setLoading ] = useState()
    const [ error, setError ] = useState()

    const [ sendRestart, { data: response, loading: restartLoading, error: restartError } ] = useMutation(RESTART)

    const restartContract = () => {
        try {
            sendRestart({ variables: { data: true } })
        }
        catch(error){ 
            console.log(error)
        }
    }

    useEffect(() => {
        if(restartError) {
            console.log("[useRestart] Case report error: ")
            console.log(restartError)
            setError(restartError)
        }
        if(restartLoading) {
            setLoading(restartLoading)
        }
        if(response) {
            console.log("[useRestart] Restart: ")
            console.log(response)
            setData(response)
        }
    }, [data, loading, error]) 

    return [ restartContract, {data,loading,error} ]
}
