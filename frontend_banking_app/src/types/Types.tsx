import {AccountAction, PopUpType, Roles} from "./Enums";
import {ReactElement} from "react";

export interface AuthData {
    isAuthenticated: boolean,
    userDetails: UserDetails | undefined,
    login: (loginData: LogInData) => void,
    logout: () => void,
    refreshAuth: () => void
}

export interface ProfileData {
    userAccount: SimpleAccountDetails | undefined
    userAccountHistory: AccountHistory[] | undefined
    updateAccountDetails: (details: SimpleAccountDetails) => void,
    openPopUp: (actionType: PopUpType) => void,
    closePopUp: (actionType: PopUpType) => void,
    isPopUpOpen: (actionType: PopUpType) => boolean
}

export interface UserDetails {
    id: number,
    username: string,
    roles: Roles[]
}

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
    transactionType: AccountAction,
    amount: number,
    message: string | null,
    timeStamp: Date
}

export type SimpleAccountDetails = {
    id: number,
    balance: number,
    name: string,
    active: boolean,
    iban: string
}

export interface AdminData {
    userData: FullUserData[] | undefined,
    handleDeactivateAccount: (accountId: number) => void,
    handleActivateAccount: (accountId: number) => void,
    handleUpdateUserRoles: (updatedRoles: Roles[], userId: number, actionAfter: () => void) => void
}

export interface FullUserData {
    user: UserDetails,
    accounts: SimpleAccountDetails[]
}

export type LogInData = {
    username: string,
    password: string
}

export type AccountActionConfig = {
    action: string,
    heading: string,
    description: string,
    selectRecipient: boolean,
    writeMessage: boolean,
    testBalance: boolean
}

export interface DashBoardData {
    pushNewAccount: (account: SimpleAccountDetails) => void
}

export interface AccountSearchResultAccountObject {
    iban: string,
    ownerName: string,
    accountId: number
}

export interface AccountSearchResult {
    response: AccountSearchResultAccountObject[]
}

export interface ListItemModel {
    label: string,
    tileObject?: ReactElement
}

export interface RoleObject {
    enum: Roles,
    label: string
    icon: ReactElement
}