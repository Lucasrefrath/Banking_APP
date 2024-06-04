import React from 'react';
import useAuthContext from "../hooks/contextHook/useAuthContext";
import AccountPreview from "../components/AccountPreview";
import useFetchUsersAccounts from "../hooks/request/useFetchUsersAccounts";
import {SimpleAccountDetails} from "../types/Types";
import {PlusIcon} from "@heroicons/react/24/outline";
import NewAccountPopUp from "../components/pop-ups/NewAccountPopUp";
import usePopUpManager from "../hooks/usePopUpManager";
import {DashBoardContext} from "../const/Context";
import useLimitations from "../hooks/useLimitations";
import {PopUpType} from "../types/Enums";
import useFormat from "../utils/useFormat";

const DashBoardPage = () => {
    const AuthData = useAuthContext();
    const { userAccounts, isPending, setUserAccounts} = useFetchUsersAccounts();
    const { openPopUp, closePopUp, isPopUpOpen} = usePopUpManager();
    const { maxAccountsForUser } = useLimitations();
    const { formatBalance } = useFormat()

    const getSum = (): string => {
        let sum: number = 0;
        userAccounts?.map(account => sum += account.balance)
        return formatBalance(sum);
    }

    const pushNewAccount = (account: SimpleAccountDetails) => {
      setUserAccounts((prevItems) => prevItems?.concat(account));
    }

    return (
      <DashBoardContext.Provider value={{
        pushNewAccount
      }}>
          <span className={"flex justify-between items-center"}>
              <h1>Welcome back, {AuthData?.userDetails?.username}</h1>
              <span className="ml-3 hidden sm:block">
                <button
                  className={"type-secondary-outline"}
                  onClick={() => openPopUp(PopUpType.USER_ACTION_NEW_ACCOUNT)}
                  disabled={(userAccounts?.length || 0 )>= maxAccountsForUser()}
                >
                  <PlusIcon className="h-5 w-5" aria-hidden="true"/>
                  new account
                </button>
              </span>
          </span>

          {isPending ? (
            <p>Loading...</p>
          ) : (
            <span>
              <ul role="list" className="divide-y divide-gray-100">
                  {userAccounts?.map((account: SimpleAccountDetails) => <AccountPreview account={account}/>)}
              </ul>
              <div className="my-1 h-px bg-gray-300"/>
              <div className={"flex justify-between"}>
                <small>{getSum()} €</small>
                <small>{userAccounts?.length}/{maxAccountsForUser()} accounts</small>
              </div>
              <NewAccountPopUp
                isOpen={isPopUpOpen(PopUpType.USER_ACTION_NEW_ACCOUNT)}
                close={() => closePopUp(PopUpType.USER_ACTION_NEW_ACCOUNT)}
              />
            </span>
          )}
      </DashBoardContext.Provider>
    );
};

export default DashBoardPage;