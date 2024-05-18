import React from 'react';
import useAuth from "../hooks/useAuth";
import AccountPreview from "../components/AccountPreview";
import useFetchUsersAccounts from "../hooks/useFetchUsersAccounts";
import {AccountDetails} from "../types-const/Types";

const DashBoardPage = () => {
    const AuthData = useAuth();
    const { userAccounts, isPending} = useFetchUsersAccounts();
    return (
      <>
        <h1 className={"text-5xl pb-5 font-bold"}>Welcome back, {AuthData?.userDetails?.username}</h1>
        {isPending ? (
          <p>Loading...</p>
        ) : (
          <ul role="list" className="divide-y divide-gray-100">
            {userAccounts?.map((account: AccountDetails) => <AccountPreview account={account}/>)}
          </ul>
        )}
      </>
    );
};

export default DashBoardPage;