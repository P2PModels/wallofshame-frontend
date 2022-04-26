import { gql } from '@apollo/client'

export const REPORT = gql`
    mutation report($data: ReportCaseCreateInput!) {
        report(data: $data) {
            companyName
            caseType
            description
            region
            profession
            gender
            ageRange
        }
    }
`

export const RESTART = gql`
    mutation restart {
        restart {
            connected
        }
    }
`
