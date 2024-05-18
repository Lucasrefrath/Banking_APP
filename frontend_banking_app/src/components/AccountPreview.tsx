import React from 'react';
import {AccountDetails} from "../types-const/Types";
import {useNavigate} from "react-router-dom";
import {formatBalance} from "../types-const/Utils";

interface AccountPreviewProps {
  account: AccountDetails
}

const AccountPreview = ({account}: AccountPreviewProps) => {
  const navigate = useNavigate();

  return (
      <li key={account.id} className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">Account {account.id}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{formatBalance(account.balance)} €</p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <a
              href={""}
              onClick={() => navigate("/account/" + account.id)}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              view Details
            </a>
        </div>
      </li>
  );
};

export default AccountPreview;