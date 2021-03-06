import { gql } from '@apollo/client'

export const SIGNUP = gql`
    mutation Signup($name: String, $email: String!, $password: String!) {
        signup(name: $name, email: $email, password: $password) {
            token
            user {
                id
                email
                name
                password
                role
            }
        }
    }
`
export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                id
                email
                name
                password
                role
                connected
            }
        }
    }
`
export const LOGOUT = gql`
    mutation Logout {
        logout {
            connected
        }
    }
`
export const ME = gql`
    query GetMe {
        me {
            id
            email
            name
            password
            role
            connected
        }
    }
`

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
        feed(take: 10) {
            id
            issuerName
            recipientName
        }
    }
`

export const ISSUE_BADGE = gql`
    mutation IssueBadge($data: BadgeCreateInput!) {
        issueBadge(data: $data) {
            id
            issuerName
            recipientName
            area
            issueDate
            txReceipt {
                to
                from
            }
        }
    }
`
