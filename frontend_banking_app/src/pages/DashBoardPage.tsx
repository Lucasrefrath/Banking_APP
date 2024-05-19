import React from 'react';
import useAuth from "../hooks/useAuth";
import AccountPreview from "../components/AccountPreview";
import useFetchUsersAccounts from "../hooks/useFetchUsersAccounts";
import {AccountAction, SimpleAccountDetails} from "../types-const/Types";
import {formatBalance} from "../types-const/Utils";
import {MinusIcon, PlusIcon} from "@heroicons/react/24/outline";

const DashBoardPage = () => {
    const AuthData = useAuth();
    const { userAccounts, isPending} = useFetchUsersAccounts();

    const getSum = (): string => {
        let sum: number = 0;
        userAccounts?.map(account => sum += account.balance)
        return formatBalance(sum);
    }
    return (
      <div>
          <div className={"flex justify-between items-center"}>
              <h1 className={"text-5xl pb-5 font-bold"}>Welcome back, {AuthData?.userDetails?.username}</h1>
              <span className="ml-3 hidden sm:block">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true"/>
            new account
          </button>
        </span>
          </div>

          {isPending ? (
            <p>Loading...</p>
          ) : (
            <ul role="list" className="divide-y divide-gray-100">
                {userAccounts?.map((account: SimpleAccountDetails) => <AccountPreview account={account}/>)}
            </ul>
          )}
          <div className="my-1 h-px bg-gray-300"/>
          <p className={"font-light"}>{getSum()} €</p>
      </div>
    );
};

export default DashBoardPage;