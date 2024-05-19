import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import useFetchAccount from "../hooks/useFetchAccount";
import {ProfileContext} from '../types-const/Context';
import AccountInfo from "../components/AccountInfo";
import {AccountAction, SimpleAccountDetails} from "../types-const/Types";
import AccountActionPopUp from "../components/pop-ups/AccountActionPopUp";
import AccountHistoryList from "../components/AccountHistoryList";

const ViewAccountPage = () => {
  const { accountId} = useParams<string>();
  const {userAccount, accountHistory, setUserAccount} = useFetchAccount(accountId || "");
  const [activePopUp, setActivePopUp] = useState<AccountAction | undefined>(undefined);

  const updateAccountDetails = (details: SimpleAccountDetails) => {
    setUserAccount(details)
  }

  const openPopUp = (actionType: AccountAction) => {
    setActivePopUp(actionType)
  }

  const isPopUpOpen = (actionType: AccountAction): boolean => {
    return activePopUp === actionType;
  }

  const closePopUp = (actionType: AccountAction) => {
    if(isPopUpOpen(actionType)) {
      setActivePopUp(undefined)
    }
  }

  return (
    <ProfileContext.Provider value={{
      userAccount: userAccount,
      userAccountHistory: accountHistory || undefined,
      updateAccountDetails,
      openPopUp,
      closePopUp,
      isPopUpOpen
    }}>
      <AccountInfo />

      <AccountHistoryList />

      <AccountActionPopUp actionType={AccountAction.DEPOSIT}/>
      <AccountActionPopUp actionType={AccountAction.WITHDRAW}/>
      <AccountActionPopUp actionType={AccountAction.TRANSFER}/>
    </ProfileContext.Provider>
  )
};

export default ViewAccountPage;