import React from 'react';
import useAuthContext from "../hooks/useAuthContext";
import AccountPreview from "../components/AccountPreview";
import useFetchUsersAccounts from "../hooks/request/useFetchUsersAccounts";
import {SimpleAccountDetails} from "../types/Types";
import {formatBalance} from "../utils/Utils";
import {PlusIcon} from "@heroicons/react/24/outline";
import NewAccountPopUp from "../components/pop-ups/NewAccountPopUp";
import OutlineSecondaryButton from "../components/customUI/CustomButtons/OutlineSecondaryButton";
import usePopUpManager from "../hooks/usePopUpManager";
import {DashBoardContext} from "../const/Context";
import {MAX_ACCOUNTS} from "../const/GlobalConst";
import useLimitations from "../hooks/useLimitations";
import {PopUpType, Roles} from "../types/Enums";

const DashBoardPage = () => {
    const AuthData = useAuthContext();
    const { userAccounts, isPending, setUserAccounts} = useFetchUsersAccounts();
    const { openPopUp, closePopUp, isPopUpOpen} = usePopUpManager();
    const { maxAccountsForUser } = useLimitations();

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
          <div className={"flex justify-between items-center"}>
              <h1 className={"text-5xl pb-5 font-bold"}>Welcome back, {AuthData?.userDetails?.username}</h1>
              <span className="ml-3 hidden sm:block">
                <OutlineSecondaryButton onClick={() => openPopUp(PopUpType.USER_ACTION_NEW_ACCOUNT)} disabled={(userAccounts?.length || 0 )>= maxAccountsForUser()}>
                  <PlusIcon className="h-5 w-5" aria-hidden="true"/>
                  new account
                </OutlineSecondaryButton>
              </span>
          </div>

          {isPending ? (
            <p>Loading...</p>
          ) : (
            <div>
              <ul role="list" className="divide-y divide-gray-100">
                  {userAccounts?.map((account: SimpleAccountDetails) => <AccountPreview account={account}/>)}
              </ul>
              <div className="my-1 h-px bg-gray-300"/>
              <div className={"flex justify-between text-sm font-extralight"}>
                <p>{getSum()} €</p>
                <p>{userAccounts?.length}/{maxAccountsForUser()} accounts</p>
              </div>
              <NewAccountPopUp
                isOpen={isPopUpOpen(PopUpType.USER_ACTION_NEW_ACCOUNT)}
                close={() => closePopUp(PopUpType.USER_ACTION_NEW_ACCOUNT)}
              />
            </div>
          )}
      </DashBoardContext.Provider>
    );
};

export default DashBoardPage;