import React, {useContext} from 'react';
import {ArrowDownRightIcon, ArrowUpLeftIcon, CreditCardIcon, CurrencyDollarIcon} from "@heroicons/react/24/solid";
import {formatBalance} from "../types-const/Utils";
import {ProfileContext} from "../types-const/Context";
import {AccountAction} from "../types-const/Types";

const AccountInfo = () => {
  const ProfileData = useContext(ProfileContext);

  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Account {ProfileData?.userAccount?.id}
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
            {formatBalance(ProfileData?.userAccount?.balance)} €
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0">
        <span className="ml-3 hidden sm:block">
          <button
            type="button"
            onClick={() => ProfileData?.openPopUp(AccountAction.WITHDRAW)}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <ArrowDownRightIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true"/>
            withdraw
          </button>
        </span>

        <span className="sm:ml-3">
            <button
              type="button"
              onClick={() => ProfileData?.openPopUp(AccountAction.DEPOSIT)}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <ArrowUpLeftIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true"/>
              deposit
            </button>
          </span>

          <span className="sm:ml-3">
              <button
                type="button"
                onClick={() => ProfileData?.openPopUp(AccountAction.TRANSFER)}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <CreditCardIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true"/>
                transfer
              </button>
            </span>
      </div>
    </div>
  );
};

export default AccountInfo;