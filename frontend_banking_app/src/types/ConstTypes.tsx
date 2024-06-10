import {ReactElement} from "react";
import {Roles} from "./Enums";

export interface ApiVersion {
  test: string,
  auth: string,
  accounts: string,
  accountActions: string,
  fastSearch: string,
  users: string,
  sessions: string,
  userSignUp: string
}

export interface FallbackPath {
  unauthorised: string,
  alreadyLoggedIn: string
}

export interface NavigationConfig {
  name: string,
  to: string,
  requireAuthentication?: boolean,
  requiredRoles?: Roles[],
  icon?: ReactElement,
  addOnStyles?: string,
  divider?: boolean
}