import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import useFetchAccount from "../hooks/useFetchAccount";
import { ProfileContext } from '../types-const/Context';
import DepositPopUp from "../components/DepositPopUp";
import AccountInfo from "../components/AccountInfo";
import {AccountDetails} from "../types-const/Types";

const ViewAccountPage = () => {
  const { accountId} = useParams<string>();
  const {userAccount, isPending, setUserAccount} = useFetchAccount(accountId || "");
  const [isDepositOpen, setIsDepositOpen] = useState<boolean>(false)

  const openDeposit = () => {
    setIsDepositOpen(true);
  }

  const closeDeposit = () => {
    setIsDepositOpen(false);
  }

  const updateAccountDetails = (details: AccountDetails) => {
    setUserAccount(details)
  }

  return (
    <ProfileContext.Provider value={{
      userAccount,
      isDepositOpen,
      updateAccountDetails,
      openDeposit,
      closeDeposit
    }}>
      <AccountInfo />
      <DepositPopUp />
    </ProfileContext.Provider>
  )
};

export default ViewAccountPage;