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

    const bulkReport = (_casesToReport) => {
        console.log("[useBulkReport] Starting bulk report:")
        console.log("[useBulkReport] Input cases: ")
        console.log(_casesToReport)
        
        // Bulk report starts, set loading state
        setLoading(true)
        // Restart index
        setCurrentReportIndex(0)
        // Initialize reports state array
        setReportsState(Array(_casesToReport.length))
        console.log("[useBulkReport] Initial state:")
        console.log(reportsState)
        console.log(Array(_casesToReport.length))

        // Set last index
        setLastReportIndex(_casesToReport.length)
        console.log("[useBulkReport] Number of cases:")
        console.log(lastReportIndex)
        console.log(_casesToReport.length)
        // Store cases to report
        setCasesToReport(_casesToReport)
        console.log(casesToReport)

        console.log("[useBulkReport] First case:")
        console.log(casesToReport[currentReportIndex])

        // Bootstrap, report first case
        const caseToReport = {
            companyName: _casesToReport[currentReportIndex][0],
            caseType: typeRenderNameToValue(_casesToReport[currentReportIndex][1]),
            description: _casesToReport[currentReportIndex][2],
            profession: professionRenderNameToValue(_casesToReport[currentReportIndex][3]),
            gender: genderRenderNameToValue(_casesToReport[currentReportIndex][4]),
            region: regionRenderNameToValue(_casesToReport[currentReportIndex][5]),
            experience: experienceRenderNameToValue(_casesToReport[currentReportIndex][6]),
            ageRange: ageRangeRenderNameToValue(_casesToReport[currentReportIndex][7]),
            terms: !!_casesToReport[currentReportIndex][8],
            email: _casesToReport[currentReportIndex][9]
        }
        reportCase(caseToReport)
    } 

    useEffect(() => {
        console.log("[useBulkReport] useEffect")
        console.log(currentError)
        console.log(currentLoading)
        console.log(currentData)

        if(currentError) {
            console.log("[useBulkReport] Error: ")
            console.log(currentError)
            setError(currentError)
            return
        }
        if(currentLoading) {
            return
        }
        if(currentData) {

            console.log(`[useBulkReport] Case ${currentReportIndex+1} reported: `)
            console.log(currentData)

            // Update state 
            let nextState = reportsState
            nextState[currentReportIndex] = true
            setReportsState(nextState)

            setData({reportsState, casesToReport})
            
            if(currentReportIndex < lastReportIndex){
                console.log("[useBulkReport] Reporting next case...")
                setCurrentReportIndex(index => index++)
                
                const caseToReport = {
                    companyName: casesToReport[currentReportIndex][0],
                    caseType: typeRenderNameToValue(casesToReport[currentReportIndex][1]),
                    description: casesToReport[currentReportIndex][2],
                    profession: professionRenderNameToValue(casesToReport[currentReportIndex][3]),
                    gender: genderRenderNameToValue(casesToReport[currentReportIndex][4]),
                    region: regionRenderNameToValue(casesToReport[currentReportIndex][5]),
                    experience: experienceRenderNameToValue(casesToReport[currentReportIndex][6]),
                    ageRange: ageRangeRenderNameToValue(casesToReport[currentReportIndex][7]),
                    terms: !!casesToReport[currentReportIndex][8],
                    email: casesToReport[currentReportIndex][9]
                }
                reportCase(caseToReport)
            }
            return
        }
        // Bulk report finished
        setLoading(false)
    }, [currentData, currentLoading, currentError]) 

    return [bulkReport, {data, loading, error}]
}
