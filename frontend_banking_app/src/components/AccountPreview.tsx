import React from 'react';
import {AccountDetails, SimpleAccountDetails} from "../types/Types";
import {useNavigate} from "react-router-dom";
import {formatBalance} from "../utils/Utils";
import {ChevronRightIcon, TrashIcon} from "@heroicons/react/24/outline";
import PrimaryButton from "./customUI/CustomButtons/PrimaryButton";
import DestructiveButton from "./customUI/CustomButtons/DestructiveButton";

interface AccountPreviewProps {
  account: SimpleAccountDetails
}

const AccountPreview = ({account}: AccountPreviewProps) => {
  const navigate = useNavigate();

  return (
      <li key={account.id} className="flex justify-between items-center gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-lg font-semibold leading-6 text-gray-900">
              {account.name ? (
                account.name
              ) : (
                "Account " + account.id
              )}
            </p>
            <p className="mt-1 truncate text-sm font-light text-gray-500">{formatBalance(account.balance)} €</p>
          </div>
        </div>
        <div>
          <PrimaryButton onClick={() => navigate("/account/" + account.id)}>
            <div className={"flex gap-1 justify-between items-center"}>
              view Details
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true"/>
            </div>
          </PrimaryButton>
        </div>
      </li>
  );
};

export default AccountPreview;