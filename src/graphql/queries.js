import { gql } from "@apollo/client";

export const ALL_ACCOUNTS = gql`
    query ($filter: AccountFilter!, $sortField: String) {
        allAccounts(filter: $filter, sortField: $sortField) {
            id
            created_at
            updated_at
            first_name
            last_name
            type
        }
    }
`;
export const ALL_TRANSACTIONS = gql`
    query ($filter: TransactionFilter!, $sortField: String) {
        allTransactions(filter: $filter, sortField: $sortField) {
            id
            created_at
            updated_at
            account_id
            type
            amount
            branch
        }
    }
`;

export const ALL_SESSIONS = gql`
    query ($filter: SessionFilter!, $sortField: String) {
        allSessions(filter: $filter, sortField: $sortField) {
            id
            created_at
            updated_at
            lat
            long
        }
    }
`;

export const ALL_TRANSACTIONS_SESSIONS_ACCOUNTS = gql`
    query ($filter1: SessionFilter!, $filter2: TransactionFilter!, $filter3: AccountFilter!, $sortField: String) {
        allSessions(filter: $filter1, sortField: $sortField) {
            id
            created_at
            updated_at
            lat
            long
        }
        allTransactions(filter: $filter2, sortField: $sortField) {
            id
            created_at
            updated_at
            account_id
            type
            amount
            branch
        }
        allAccounts(filter: $filter3, sortField: $sortField) {
            id
            created_at
            updated_at
            first_name
            last_name
            type
        }
    }
`;
