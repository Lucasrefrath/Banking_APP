import React from 'react';
import {AccountDetails} from "../types-const/Types";
import {useNavigate} from "react-router-dom";

interface AccountPreviewProps {
  account: AccountDetails
}

const AccountPreview = ({account}: AccountPreviewProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <h4>ID: {account.id}</h4>
      <p>Balance: {account.balance}</p>
      <button onClick={() => navigate("/account/" + account.id)}>view</button>
    </div>
  );
};

export default AccountPreview;