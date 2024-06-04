import React from 'react';
import {SimpleAccountDetails} from "../types/Types";
import {useNavigate} from "react-router-dom";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import useFormat from "../utils/useFormat";

interface AccountPreviewProps {
  account: SimpleAccountDetails
}

const AccountPreview = ({account}: AccountPreviewProps) => {
  const navigate = useNavigate();
  const { formatBalance } = useFormat();

  return (
      <li key={account.id} className="flex justify-between items-center gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <h4>
              {account.name ? (
                account.name
              ) : (
                "Account " + account.id
              )}
            </h4>
            <small className="mt-1">{formatBalance(account.balance)} €</small>
          </div>
        </div>
        <div>
          <button className={"type-primary"} onClick={() => navigate("/account/" + account.id)}>
            <div className={"flex gap-1 justify-between items-center"}>
              view Details
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true"/>
            </div>
          </button>
        </div>
      </li>
  );
};

export default AccountPreview;