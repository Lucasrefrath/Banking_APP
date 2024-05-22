export enum PopUpType {
  ACCOUNT_ACTION_DEPOSIT,
  ACCOUNT_ACTION_WITHDRAW,
  ACCOUNT_ACTION_TRANSFER,
  ACCOUNT_VIEW_SHOW_HISTORY,
  USER_ACTION_NEW_ACCOUNT
}

export enum AccountAction {
  DEPOSIT = "/deposit",
  WITHDRAW = "/withdraw",
  TRANSFER = "/transfer"
}

export enum Roles {
  USER = "ROLE_USER",
  ADMIN = "ROLE_ADMIN",
  VIP = "ROLE_VIP"
}

export enum MessageLevel {
  NOTICE,
  ERROR
}