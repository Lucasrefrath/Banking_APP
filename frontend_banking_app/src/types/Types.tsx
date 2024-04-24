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

export interface UserDetails {
    username: string,
    roles: string[]
}