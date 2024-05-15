import React from 'react';
import useAuth from "../hooks/useAuth";
import AccountPreview from "../components/AccountPreview";
import useFetchUsersAccounts from "../hooks/useFetchUsersAccounts";
import {AccountDetails, UserDetails} from "../types-const/Types";

const DashBoardPage = () => {
    const AuthData = useAuth();
    const { userAccounts, isPending} = useFetchUsersAccounts();
    return (
        <>
          <h1>Hello, {AuthData?.userDetails?.username}</h1>
          {isPending ? (
            <p>Loading...</p>
          ) : (
            userAccounts?.map((account: AccountDetails) => {
              return <AccountPreview account={account}/>
            })
          )}
        </>
    );
};

export default DashBoardPage;