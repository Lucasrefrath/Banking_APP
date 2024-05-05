export interface AuthData {
    isAuthenticated: boolean,
    userDetails: UserDetails | undefined,
    login: () => void,
    logout: () => void
}

export interface ApiPath {
    testV1: string,
    authV1: string
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
