import {ReactElement} from "react";

export interface AuthData {
    isAuthenticated: boolean,
    userDetails: UserDetails | undefined,
    login: (loginData: LogInData) => void,
    logout: () => void
}

export interface ProfileData {
    userAccount: SimpleAccountDetails | undefined
    userAccountHistory: AccountHistory[] | undefined
    updateAccountDetails: (details: SimpleAccountDetails) => void,
    openPopUp: (actionType: AccountAction) => void,
    closePopUp: (actionType: AccountAction) => void,
    isPopUpOpen: (actionType: AccountAction) => boolean
}

export interface ApiVersion {
    test: string,
    auth: string,
    accounts: string,
    accountActions: string
}

export interface FallbackPath {
    unauthorised: string
}

export interface UserDetails {
    id: number,
    username: string,
    roles: Role[]
}

export type Role = "ROLE_USER" | "ROLE_ADMIN"

export type AccountDetails = {
    accountDetails: SimpleAccountDetails
    accountHistory: AccountHistory[] | null
}

export type AccountHistory = {
    id: number,
    originAccount: SimpleAccountDetails | null,
    originBalanceBefore: number | null,
    originBalanceAfter: number | null,
    destinationAccount: SimpleAccountDetails | null
    destinationBalanceBefore: number | null,
    destinationBalanceAfter: number | null,
    transactionType: string,
    amount: number,
    message: string | null,
    timeStamp: Date
}

export type SimpleAccountDetails = {
    id: number,
    balance: number
}

export interface Navigation {
    name: string,
    to: string,
    icon?: ReactElement,
    addOnStyles?: string,
    divider?: boolean
}

export type LogInData = {
    username: string,
    password: string
}

export type DepositRequst = {
    accountId: number,
    amount: number,
    recipientId?: number,
    message?: string
}

export enum AccountAction {
    DEPOSIT = "/deposit",
    WITHDRAW = "/withdraw",
    TRANSFER = "/transfer"
}

export type AccountActionConfig = {
    action: string,
    heading: string,
    description: string,
    selectRecipient: boolean,
    writeMessage: boolean,
    testBalance: boolean
}

export enum MessageLevel {
    NOTICE,
    ERROR
}

export type AccountActionResponse = {
    updatedAccountData: SimpleAccountDetails,
    newHistoryData: AccountHistory
}
