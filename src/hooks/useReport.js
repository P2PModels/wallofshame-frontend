import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { REPORT } from '../services/cases_backend/queries'
import { ADD_USER } from '../services/users/queries'

export default function useReport() {
    const [ data, setData ] = useState()
    const [ loading, setLoading ] = useState()
    const [ error, setError ] = useState()

    const [ sendReport, { data: caseReported, loading: caseLoading, error: caseError } ] = useMutation(REPORT)
    const [ addUser, { data: addedUser, loading: userLoading, error: userError }] = useMutation(ADD_USER)

    const reportCase = (caseToReport) => {

        if(caseToReport.terms){
            // console.log("[useReport] Creating user...")
            let user = {
                email: caseToReport.email,
                terms: caseToReport.terms,
                region: caseToReport.region,
                profession: caseToReport.profession,
                gender: caseToReport.gender,
            }
            try {
                addUser({ variables: { data: user } })
            }
            catch(error){ 
                console.log(error)
            }
        }

        // console.log("[useReport] Reporting case...")
        let reportCase = {
            companyName: caseToReport.companyName,
            caseType: caseToReport.caseType,
            description: caseToReport.description,
            region: caseToReport.region,
            profession: caseToReport.profession,
            gender: caseToReport.gender,
            ageRange: caseToReport.ageRange,
            experience: caseToReport.experience,
        }
        try {
            sendReport({ variables: { data: reportCase } })
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
        if(caseLoading || userLoading) {
            setLoading(caseLoading || userLoading)
        }
        if(caseReported) {
            // console.log("[useReport] Reported case: ")
            // console.log(caseReported)
            setData(_data => ({
                ..._data,
                caseReported
            }))
        }
        if(addedUser) {
            // console.log("[useReport] Created user: ")
            // console.log(addedUser)
            setData(_data => ({
                ..._data,
                addedUser
            }))
        }
        if(caseReported && addedUser) {
            setLoading(false)
        }
    }, [caseReported, addedUser, caseLoading, userLoading, caseError, userError]) 

    return [ reportCase, {data,loading,error} ]
}
