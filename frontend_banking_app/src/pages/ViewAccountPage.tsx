import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import useFetchAccount from "../hooks/useFetchAccount";
import {ProfileContext} from '../types-const/Context';
import AccountInfo from "../components/AccountInfo";
import {AccountAction, AccountDetails} from "../types-const/Types";
import AccountActionPopUp from "../components/pop-ups/AccountActionPopUp";

const ViewAccountPage = () => {
  const { accountId} = useParams<string>();
  const {userAccount, isPending, setUserAccount} = useFetchAccount(accountId || "");
  const [activePopUp, setActivePopUp] = useState<AccountAction | undefined>(undefined)

  const updateAccountDetails = (details: AccountDetails) => {
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
      userAccount,
      updateAccountDetails,
      openPopUp,
      closePopUp,
      isPopUpOpen
    }}>
      <AccountInfo />
      <AccountActionPopUp actionType={AccountAction.DEPOSIT}/>
      <AccountActionPopUp actionType={AccountAction.WITHDRAW}/>
      <AccountActionPopUp actionType={AccountAction.TRANSFER}/>
    </ProfileContext.Provider>
  )
};

export default ViewAccountPage;