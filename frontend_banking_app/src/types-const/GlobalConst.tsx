import {ApiPath, FallbackPath} from "./Types";

export const API_URLS: ApiPath = {
    testV1: 'http://localhost:8080/api/v1',
    authV1: 'http://localhost:8080/auth/v1'
}

export const FALLBACK_URLS: FallbackPath = {
    unauthorised: "/login"
}