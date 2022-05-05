import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { RESTART as RESTART_CASES } from '../services/cases_backend/queries'
import { DELETE_USERS as RESTART_USERS } from '../services/users/queries'

export default function useRestart() {
    const [ data, setData ] = useState()
    const [ loading, setLoading ] = useState()
    const [ error, setError ] = useState()

    const [ sendRestartCases, { data: restartedCases, loading: caseLoading, error: caseError } ] = useMutation(RESTART_CASES)
    const [ sendRestartUsers, { data: restartedUsers, loading: userLoading, error: userError } ] = useMutation(RESTART_USERS)

    const restartContract = () => {

        // console.log("[useRestart] Restarting database")
        try {
            sendRestartUsers()
        }
        catch(error){ 
            console.log(error)
        }

        // console.log("[useRestart] Restarting contract")
        try {
            sendRestartCases()
        }
        catch(error){ 
            console.log(error)
        }
    }

    useEffect(() => {
        if(caseError) {
            // console.log("[useRestart] Case restart error: ")
            // console.log(caseError)
            setError(caseError)
        }
        if(userError) {
            // console.log("[useRestart] Users restart error: ")
            // console.log(userError)
            setError(userError)
        }
        if(caseLoading) {
            setLoading(true)
        }
        if(userLoading) {
            setLoading(true)
        }
        if(restartedCases) {
            // console.log("[useRestart] Restarted cases: ")
            // console.log(restartedCases)
            setData(_data => ({
                ..._data,
                restartedCases: restartedCases.restart.connected
            }))
        }
        if(restartedUsers) {
            // console.log("[useRestart] Restarted users: ")
            // console.log(restartedUsers)
            setData(_data => ({
                ..._data,
                restartedUsers: restartedUsers.deleteUsers
            }))
        }
        if(restartedUsers && restartedCases){
            // console.log("[useRestart] Restarted completed: ")
            // console.log(data)
            setLoading(false)
        }
    }, [restartedCases, caseLoading, caseError, restartedUsers, userLoading, userError]) 

    return [ restartContract, {data,loading,error} ]
}
