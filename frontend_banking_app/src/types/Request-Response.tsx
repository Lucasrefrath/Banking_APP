import {AccountHistory, SimpleAccountDetails} from "./Types";
import {Roles, ApprovalStatus} from "./Enums";

export interface AccountActionResponse {
  updatedAccountData: SimpleAccountDetails,
  newHistoryData: AccountHistory
}

export interface AccountActionApprovalStatus {
  approvalId: number,
  status: ApprovalStatus,
  approveUntil: Date
}

export interface CreateAccountRequest {
  name: string
}

export interface RequestSignUpRequest {
  username: string,
  password: string
}

export interface RequestSignUpResponse {
  id: number,
  username: string,
  status: ApprovalStatus,
  processedAt: Date,
  createdAt: Date
  rejectionMessage: string
}

export interface CheckSignUpStatusResponse {
  id: number,
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

export interface RejectRequestRequest {
  requestId: number,
  reason: string
}

export interface ApproveRequestRequest {
  requestId: number,
}