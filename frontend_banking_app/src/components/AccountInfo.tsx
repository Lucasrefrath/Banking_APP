import React from 'react';
import {CreditCardIcon, CurrencyEuroIcon} from "@heroicons/react/24/solid";
import {formatBalance} from "../utils/Utils";
import {MinusIcon, PlusIcon} from "@heroicons/react/24/outline";
import PrimaryButton from "./customUI/CustomButtons/PrimaryButton";
import OutlineSecondaryButton from "./customUI/CustomButtons/OutlineSecondaryButton";
import {PopUpType} from "../types/Enums";
import useProfileContext from "../hooks/contextHook/useProfileContext";

const AccountInfo = () => {
  const ProfileData= useProfileContext();

  if(!ProfileData) return <p>Loading...</p>

  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {ProfileData?.userAccount?.name ? (
              ProfileData?.userAccount?.name
            ) : (
              `Account ${ProfileData?.userAccount?.id}`
            )}
          </h2>
          <p className={"text-sm font-light text-gray-700"}>{ProfileData.userAccount?.iban}</p>
        </div>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CurrencyEuroIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
            {formatBalance(ProfileData?.userAccount?.balance)} €
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0">
        <span className="ml-3 hidden sm:block">
          <OutlineSecondaryButton onClick={() => ProfileData?.openPopUp(PopUpType.ACCOUNT_ACTION_WITHDRAW)}>
            <MinusIcon className="h-5 w-5" aria-hidden="true"/>
            withdraw
          </OutlineSecondaryButton>
        </span>
        <span className="sm:ml-3">
          <OutlineSecondaryButton onClick={() => ProfileData?.openPopUp(PopUpType.ACCOUNT_ACTION_DEPOSIT)}>
            <PlusIcon className="h-5 w-5" aria-hidden="true"/>
            deposit
          </OutlineSecondaryButton>
        </span>
        <span className="sm:ml-3">
          <PrimaryButton onClick={() => ProfileData?.openPopUp(PopUpType.ACCOUNT_ACTION_TRANSFER)}>
            <CreditCardIcon className="h-5 w-5" aria-hidden="true"/>
              transfer
          </PrimaryButton>
        </span>
      </div>
    </div>
  );
};

export default AccountInfo;