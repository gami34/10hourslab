import { gql } from "@apollo/client"

export const ALL_ACCOUNTS = gql`
query($filter: AccountFilter!) {
 allAccounts(filter: $filter){
        id
        created_at
        updated_at
        first_name
        last_name
        type
  }
}
`
export const ALL_TRANSACTIONS = gql`
query {
    allTransactions{
        id
        created_at
        updated_at
        account_id
        type
        amount
        branch
  }
}
`

export const ALL_SESSIONS = gql`
query{
    allSessions{
        id
        created_at
        updated_at
        lat
        long
  }
}
`