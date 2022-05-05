import React, {useState, useEffect } from 'react'
import useReport from './useReport'
import { regionRenderNameToValue, typeRenderNameToValue, genderRenderNameToValue, professionRenderNameToValue, ageRangeRenderNameToValue, experienceRenderNameToValue } from '../helpers/general-helpers';

export default function useBulkReport() {
    const [ data, setData ] = useState()
    const [ loading, setLoading ] = useState()
    const [ error, setError ] = useState()

    const [ reportsState, setReportsState ] = useState()
    const [ casesToReport, setCasesToReport ] = useState() 
    const [ currentReportIndex, setCurrentReportIndex ] = useState()
    const [ lastReportIndex, setLastReportIndex ] = useState() 
    const [ reportCase, {data: currentData, loading: currentLoading, error: currentError} ] = useReport()

    const bulkReport = (inputCasesToReport) => {
        // console.log("[useBulkReport] Starting bulk report...")
        
        // Bulk report starts, set loading state
        setLoading(true)
        // Restart index
        setCurrentReportIndex(0)
        // Initialize reports state array
        setReportsState(Array(inputCasesToReport.length))
        // Set last index
        setLastReportIndex(inputCasesToReport.length)
        // Store cases to report
        setCasesToReport(inputCasesToReport)

        // Bootstrap, report first case
        const caseToReport = {
            companyName: inputCasesToReport[0][0],
            caseType: typeRenderNameToValue(inputCasesToReport[0][1]),
            description: inputCasesToReport[0][2],
            profession: professionRenderNameToValue(inputCasesToReport[0][3]),
            gender: genderRenderNameToValue(inputCasesToReport[0][4]),
            region: regionRenderNameToValue(inputCasesToReport[0][5]),
            experience: experienceRenderNameToValue(inputCasesToReport[0][6]),
            ageRange: ageRangeRenderNameToValue(inputCasesToReport[0][7]),
            terms: !!inputCasesToReport[0][8],
            email: inputCasesToReport[0][9]
        }
        reportCase(caseToReport)
    } 

    useEffect(() => {

        if(currentError) {
            console.log("[useBulkReport] Error: ")
            console.log(currentError)
            setError(currentError)
            return
        }
        if(currentLoading) {
            return
        }
        if(currentData && !currentLoading) {

            console.log(`[useBulkReport] Case ${currentReportIndex+1} reported: `)
            console.log(currentData)

            // Update state 
            let nextState = reportsState
            nextState[currentReportIndex] = true
            setReportsState(nextState)

            setData({reportsState, casesToReport})
            
            if(currentReportIndex+1 < lastReportIndex){
                // console.log("[useBulkReport] Reporting next case...")
                setCurrentReportIndex(index => index+1)
                
                const caseToReport = {
                    companyName: casesToReport[currentReportIndex+1][0],
                    caseType: typeRenderNameToValue(casesToReport[currentReportIndex+1][1]),
                    description: casesToReport[currentReportIndex+1][2],
                    profession: professionRenderNameToValue(casesToReport[currentReportIndex+1][3]),
                    gender: genderRenderNameToValue(casesToReport[currentReportIndex+1][4]),
                    region: regionRenderNameToValue(casesToReport[currentReportIndex+1][5]),
                    experience: experienceRenderNameToValue(casesToReport[currentReportIndex+1][6]),
                    ageRange: ageRangeRenderNameToValue(casesToReport[currentReportIndex+1][7]),
                    terms: !!casesToReport[currentReportIndex+1][8],
                    email: casesToReport[currentReportIndex+1][9]
                }
                reportCase(caseToReport)
            } else if(currentReportIndex+1 == lastReportIndex) {
                // Bulk report finished
                setLoading(false)
            }
            return
        }
        
    }, [currentData, currentLoading, currentError]) 

    return [bulkReport, {data, loading, error}]
}
