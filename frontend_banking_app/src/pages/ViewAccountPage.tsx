import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useFetchAccount from "../hooks/request/useFetchAccount";
import {ProfileContext} from '../const/Context';
import AccountInfo from "../components/AccountInfo";
import {SimpleAccountDetails} from "../types/Types";
import AccountActionPopUp from "../components/pop-ups/AccountActionPopUp";
import AccountHistoryList from "../components/AccountHistoryList";
import usePopUpManager from "../hooks/usePopUpManager";
import {AccountAction, PopUpType} from "../types/Enums";
import {EyeSlashIcon} from "@heroicons/react/24/outline";
import DestructiveButton from "../components/customUI/DestructiveButton";
import useAccountActive from "../hooks/request/useAccountActive";
import useFormat from "../utils/useFormat";
import ExpectingApprovalPopUp from "../components/pop-ups/ExpectingApprovalPopUp";

const ViewAccountPage = () => {
  const { accountId} = useParams<string>();
  const {userAccount, accountHistory, setUserAccount} = useFetchAccount(accountId || "");
  const { openPopUp, closePopUp, isPopUpOpen} = usePopUpManager();
  const { handleDeactivate } = useAccountActive();
  const { formatBalance } = useFormat();
  const navigate = useNavigate();

  const updateAccountDetails = (details: SimpleAccountDetails) => {
    setUserAccount(details)
  }

  if(!userAccount) return <p>Loading...</p>

  return <ProfileContext.Provider value={{
    userAccount: userAccount,
    userAccountHistory: accountHistory || undefined,
    updateAccountDetails,
    openPopUp,
    closePopUp,
    isPopUpOpen
  }}>
    <AccountInfo />
    <AccountHistoryList />

    <span className={"flex justify-end"}>
      <DestructiveButton
        onClick={() => handleDeactivate({id: userAccount?.id}, () => navigate("/dashboard"))}
        affirmationMessage={`You really want to deactivate the account "${userAccount.name || userAccount.id}"? The existing balance of ${formatBalance(userAccount.balance)}€ will be lost!`}
      >
        <EyeSlashIcon className={"icon"}/>
        Deactivate this Account
      </DestructiveButton>
    </span>

    <AccountActionPopUp actionType={AccountAction.DEPOSIT} popUpType={PopUpType.ACCOUNT_ACTION_DEPOSIT}/>
    <AccountActionPopUp actionType={AccountAction.WITHDRAW} popUpType={PopUpType.ACCOUNT_ACTION_WITHDRAW}/>
    <AccountActionPopUp actionType={AccountAction.TRANSFER} popUpType={PopUpType.ACCOUNT_ACTION_TRANSFER}/>
    <ExpectingApprovalPopUp />
  </ProfileContext.Provider>
};

export default ViewAccountPage;