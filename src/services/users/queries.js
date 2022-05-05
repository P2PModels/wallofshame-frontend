import { gql } from '@apollo/client'


export const USERS = gql`

query users($filter: String){
    users(filter: $filter ) {
      email
    }
}
`

export const ADD_USER = gql`
    mutation addUser($data: UserCreateInput!) {
        add(data: $data) {
            id
            email
            terms
            region
            profession
            gender
        }
    }
`
export const DELETE_USERS = gql`
    mutation deleteUsers {
        deleteUsers 
    }
`