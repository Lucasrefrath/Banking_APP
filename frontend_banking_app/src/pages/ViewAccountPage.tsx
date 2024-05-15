import React from 'react';
import {useParams} from "react-router-dom";
import useFetchAccount from "../hooks/useFetchAccount";

const ViewAccountPage = () => {
  const { accountId} = useParams<string>();
  const {userAccount, accountHistory, isPending} = useFetchAccount(accountId || "");

  if(isPending) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>View Account Page {accountId}</h1>
      <p>balance: {userAccount?.balance}</p>
    </div>
  );
};

export default ViewAccountPage;