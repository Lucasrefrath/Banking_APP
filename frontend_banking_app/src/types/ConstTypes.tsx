import {ReactElement} from "react";

export interface ApiVersion {
  test: string,
  auth: string,
  accounts: string,
  accountActions: string
}

export interface FallbackPath {
  unauthorised: string
}

export interface NavigationConfig {
  name: string,
  to: string,
  icon?: ReactElement,
  addOnStyles?: string,
  divider?: boolean
}