import {AccountActionConfig, ListItemModel, LogInData,} from "../types/Types";
import {Cog6ToothIcon, LockClosedIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import {ApiVersion, FallbackPath, NavigationConfig} from "../types/ConstTypes";
import {AccountAction, Roles} from "../types/Enums";
import UserManagementTile from "../components/tiles/UserManagementTile";
import React from "react";
import ActiveSessionsTile from "../components/tiles/ActiveSessionsTile";

export const API_URLS_V1: ApiVersion = {
    test: 'http://localhost:8080/api-test/v1',
    auth: 'http://localhost:8080/auth/v1',
    accounts: 'http://localhost:8080/api/v1/accounts',
    accountActions: 'http://localhost:8080/api/v1/account/actions',
    fastSearch: 'http://localhost:8080/api/v1/fastSearch',
    users: 'http://localhost:8080/api/v1/users',
}

export const FALLBACK_URLS: FallbackPath = {
    unauthorised: "/login"
}

export const MAX_ACCOUNTS = {
    DEFAULT: 1,
    USER: 5,
    ADMIN: 10
}

export const ADMIN_OPTIONS: ListItemModel[] = [
    {label: "User", tileObject: <UserManagementTile /> },
    {label: "Sessions", tileObject: <ActiveSessionsTile />},
    {label: "Requests"}
]

export const DEFAULT_USER: LogInData = {
    username: "admin",
    password: "admin"
}

export const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"
}

export const navigation: NavigationConfig[] = [
    { name: 'Home', to: '/'},
    { name: 'Dashboard', to: '/dashboard', requireAuthentication: true},
    { name: 'Test', to: '/test'},
    { name: 'Admin', to: '/admin', requiredRoles: [Roles.ADMIN], requireAuthentication: true},
]

export const userNavigation: NavigationConfig[] = [
    { name: 'Your Profile', to: '/', icon: <UserCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/> },
    { name: 'Settings', to: '/', icon: <Cog6ToothIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />},
    { name: 'Sign out', to: '/logout', icon: <LockClosedIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-500" aria-hidden="true" />, addOnStyles: "text-red-500", divider: true},
]

export const getAccountActionConfig = (actionType: AccountAction): AccountActionConfig => {
    switch (actionType) {
        case AccountAction.DEPOSIT: return {
            action: "deposit",
            heading: "Deposit to Account",
            description: "simulates deposit from ATM or PayPal",
            selectRecipient: false,
            writeMessage: false,
            testBalance: false
        }
        case AccountAction.WITHDRAW: return {
            action: "withdraw",
            heading: "Withdraw from Account",
            description: "simulates withdraw to ATM or PayPal",
            selectRecipient: false,
            writeMessage: false,
            testBalance: true
        }
        case AccountAction.TRANSFER: return {
            action: "transfer",
            heading: "Transfer to Account",
            description: "transfer money to other accounts",
            selectRecipient: true,
            writeMessage: true,
            testBalance: true
        }
    }
}