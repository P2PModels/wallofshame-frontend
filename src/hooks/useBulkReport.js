import React, {useState, useEffect } from 'react'
import { useReport } from './useReport'

export default function useBulkReport(casesToReport) {
    const [ reportsState, setReportsState ] = useState(Array(casesToReport.length))
    const [ currentReportIndex, setCurrentReportIndex ] = useState(0) 
    const [ reportCase, {data, loading, error} ] = useReport()

    useEffect(() => {
        if(error) {
            console.log("[useBulkReport] Error: ")
            console.log(error)
            return
        }
        if(loading) {
            return
        }
        if(data) {
            console.log("[useBulkReport] Case reported: ")
            console.log(data)

            // Update state 
            let nextState = reportsState
            nextState[currentReportIndex] = true
            setReportsState(nextState)
            
            console.log("[useBulkReport] Reporting next case...")
            setCurrentReportIndex(currentReportIndex++)
            reportCase(casesToReport[currentReportIndex])
            return
        }
        // Bootstrap, report first case
        reportCase(casesToReport[currentReportIndex])
    }, [data, loading, error]) 

    return reportsState
}
