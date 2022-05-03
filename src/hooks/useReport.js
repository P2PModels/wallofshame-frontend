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
        
        console.log("[useReport] Reporting case")
        console.log(caseToReport)

        if(caseToReport.terms){
            console.log("[useReport] Creating user...")
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

        console.log("[useReport] Reporting case...")
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
        if(caseError || userError) {
            console.log("[useReport] Case report error: ")
            console.log(caseError)
            console.log("[useReport] User creation error: ")
            console.log(userError)
            setError(caseError || userError ? {caseError,userError} : null)
        }
        if(caseLoading || userLoading) {
            setLoading(caseLoading || userLoading)
        }
        if(caseReported && addedUser) {
            console.log("[useReport] Case reported: ")
            console.log(caseReported)
            console.log("[useReport] User created: ")
            console.log(addedUser)
            setData({caseReported,addedUser})
        }
    }, [caseReported, addedUser, caseLoading, userLoading, caseError, userError]) 

    return [ reportCase, {data,loading,error} ]
}
