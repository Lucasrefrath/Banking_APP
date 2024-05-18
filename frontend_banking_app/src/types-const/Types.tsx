export interface AuthData {
    isAuthenticated: boolean,
    userDetails: UserDetails | undefined,
    login: (loginData: LogInData) => void,
    logout: () => void
}

export interface ProfileData {
    userAccount: AccountDetails | undefined
    isDepositOpen: boolean,
    updateAccountDetails: (details: AccountDetails) => void,
    openDeposit: () => void,
    closeDeposit: () => void
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
    id: number,
    balance: number
}

export type AccountHistory = {

}

export interface Navigation {
    name: string,
    to: string,
}

export type LogInData = {
    username: string,
    password: string
}

export type DepositRequst = {
    accountId: number,
    amount: number
}
