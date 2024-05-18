import {ApiVersion, FallbackPath, Navigation} from "./Types";

export const API_URLS_V1: ApiVersion = {
    test: 'http://localhost:8080/api-test/v1',
    auth: 'http://localhost:8080/auth/v1',
    accounts: 'http://localhost:8080/api/v1/accounts',
    accountActions: 'http://localhost:8080/api/v1/account/actions'
}

export const FALLBACK_URLS: FallbackPath = {
    unauthorised: "/login"
}

export const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"
}

export const navigation: Navigation[] = [
    { name: 'Home', to: '/'},
    { name: 'Dashboard', to: '/dashboard'},
    { name: 'Projects', to: '/projects'},
    { name: 'Calendar', to: '/calendar'},
    { name: 'Reports', to: '/reports'},
]
export const userNavigation: Navigation[] = [
    { name: 'Your Profile', to: '/' },
    { name: 'Settings', to: '/' },
    { name: 'Sign out', to: '/logout' },
]