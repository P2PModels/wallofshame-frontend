import { gql } from '@apollo/client'

export const GET_CASES = gql`
    query GetCases {
        cases {
            id
            companyName
            caseType
            description
            region
            profession
            gender
            ageRange
            experience
        }
    }
`

export const GET_STAT = gql`
    query GetStat($regionId: ID!) {
        stat(id: $regionId) {
            regionName
            casesByRegion
            casesByType
            casesByProfession
            casesByGender
            casesByAgeRange
        }
    }
`
