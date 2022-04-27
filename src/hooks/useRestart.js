import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { RESTART } from '../services/cases_backend/queries'

export default function useRestart() {
    const [ data, setData ] = useState()
    const [ loading, setLoading ] = useState()
    const [ error, setError ] = useState()

    const [ sendRestart, { data: response, loading: restartLoading, error: restartError } ] = useMutation(RESTART)

    const restartContract = () => {
        console.log("Restarting contract")
        try {
            sendRestart()
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
            setLoading(true)
        }
        if(response) {
            console.log("[useRestart] Restart: ")
            console.log(response)
            setData(response)
            setLoading(false)
        }
    }, [response, restartLoading, restartError]) 

    return [ restartContract, {data,loading,error} ]
}
