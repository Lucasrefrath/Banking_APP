import {AccountHistory, SimpleAccountDetails} from "./Types";
import {Roles} from "./Enums";

export type AccountActionResponse = {
  updatedAccountData: SimpleAccountDetails,
  newHistoryData: AccountHistory
}

export interface CreateAccountRequest {
  name: string
}

export type DepositRequst = {
  accountId: number,
  amount: number,
  recipientId?: number,
  message?: string
}

export interface DeleteAccountRequest {
  id: number
}

export interface UpdateUserRolesRequest {
  userId: number,
  updatedRoles: Roles[]
}