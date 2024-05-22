import {AccountHistory, SimpleAccountDetails} from "./Types";

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