import { gql } from 'graphql-request'

export const createCook = gql`
  mutation CreateCook($createCookInput: CreateCookInput!) {
    createCook(createCookInput: $createCookInput) {
      uid
    }
  }
`
