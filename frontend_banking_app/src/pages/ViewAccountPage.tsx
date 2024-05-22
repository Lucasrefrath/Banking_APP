import React from 'react';
import {useParams} from "react-router-dom";
import useFetchAccount from "../hooks/request/useFetchAccount";
import {ProfileContext} from '../const/Context';
import AccountInfo from "../components/AccountInfo";
import {SimpleAccountDetails} from "../types/Types";
import AccountActionPopUp from "../components/pop-ups/AccountActionPopUp";
import AccountHistoryList from "../components/AccountHistoryList";
import usePopUpManager from "../hooks/usePopUpManager";
import {AccountAction, PopUpType} from "../types/Enums";
import {TrashIcon} from "@heroicons/react/24/outline";
import DestructiveButton from "../components/customUI/CustomButtons/DestructiveButton";
import useDeactivateAccount from "../hooks/request/useDeactivateAccount";
import {formatBalance} from "../utils/Utils";

const ViewAccountPage = () => {
  const { accountId} = useParams<string>();
  const {userAccount, accountHistory, setUserAccount} = useFetchAccount(accountId || "");
  const { openPopUp, closePopUp, isPopUpOpen} = usePopUpManager();
  const { handleDelete } = useDeactivateAccount();

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

    <div className={"flex justify-end"}>
      <DestructiveButton
        onClick={() => handleDelete({id: userAccount?.id})}
        affirmationMessage={`You really want to deactivate the account "${userAccount.name || userAccount.id}"? The existing balance of ${formatBalance(userAccount.balance)}€ will be lost!`}
        affirmationRequired={true}
      >
        <TrashIcon className={"h-5 w-5"}/>
        Deactivate this Account
      </DestructiveButton>
    </div>

    <AccountActionPopUp actionType={AccountAction.DEPOSIT} popUpType={PopUpType.ACCOUNT_ACTION_DEPOSIT}/>
    <AccountActionPopUp actionType={AccountAction.WITHDRAW} popUpType={PopUpType.ACCOUNT_ACTION_WITHDRAW}/>
    <AccountActionPopUp actionType={AccountAction.TRANSFER} popUpType={PopUpType.ACCOUNT_ACTION_TRANSFER}/>
  </ProfileContext.Provider>
};

export default ViewAccountPage;