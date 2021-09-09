import { gql } from '@apollo/client'

export const ALL_BADGES = gql`
    query GetAllBadges {
        allBadges {
            id
            issuerName
            recipientName
            area
            issueDate
        }
    }
`

export const FIRST_10_BADGES = gql`
    query {
        badges(first: 10) {
            id
            issuerName
            recipientName
        }
    }
`

export const ISSUE_BADGE = gql`
    mutation IssueBadge($data: BadgeCreateInput!) {
        addBadge(data: $data) {
            id
            issuerName
            recipientName
            area
            issueDate
        }
    }
`
