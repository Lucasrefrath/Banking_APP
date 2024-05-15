import {ApiVersion, FallbackPath} from "./Types";

export const API_URLS_V1: ApiVersion = {
    test: 'http://localhost:8080/api-test/v1',
    auth: 'http://localhost:8080/auth/v1',
    accounts: 'http://localhost:8080/api/v1/accounts'
}

export const FALLBACK_URLS: FallbackPath = {
    unauthorised: "/login"
}