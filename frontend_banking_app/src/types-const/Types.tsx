export interface AuthData {
    isAuthenticated: boolean,
    userDetails: UserDetails | undefined,
    login: () => void,
    logout: () => void
}

export interface ApiVersion {
    test: string,
    auth: string,
    accounts: string
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
