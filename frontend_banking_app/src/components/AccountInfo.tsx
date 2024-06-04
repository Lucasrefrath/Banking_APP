import React from 'react';
import {CreditCardIcon, CurrencyEuroIcon} from "@heroicons/react/24/solid";
import {MinusIcon, PlusIcon} from "@heroicons/react/24/outline";
import {PopUpType} from "../types/Enums";
import useProfileContext from "../hooks/contextHook/useProfileContext";
import useFormat from "../utils/useFormat";

const AccountInfo = () => {
  const ProfileData= useProfileContext();
  const { formatBalance } = useFormat();

  if(!ProfileData) return <p>Loading...</p>

  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <span className="min-w-0 flex-1">
        <div>
          <h2>
            {ProfileData?.userAccount?.name ? (
              ProfileData?.userAccount?.name
            ) : (
              `Account ${ProfileData?.userAccount?.id}`
            )}
          </h2>
          <small>{ProfileData.userAccount?.iban}</small>
        </div>
        <div className="mt-1 flex flex-col">
          <small className="mt-2 flex items-center gap-1">
            <CurrencyEuroIcon className={"icon"} />
            {formatBalance(ProfileData?.userAccount?.balance)} €
          </small>
        </div>
      </span>
      <span className="mt-5 flex">
        <span className="ml-3">
          <button
            className={"type-secondary-outline"}
            onClick={() => ProfileData?.openPopUp(PopUpType.ACCOUNT_ACTION_WITHDRAW)}
          >
            <MinusIcon className={"icon"} />
            withdraw
          </button>
        </span>
        <span className="ml-3">
          <button
            className={"type-secondary-outline"}
            onClick={() => ProfileData?.openPopUp(PopUpType.ACCOUNT_ACTION_DEPOSIT)}
          >
            <PlusIcon className={"icon"}/>
            deposit
          </button>
        </span>
        <span className="ml-3">
          <button className={"type-primary"} onClick={() => ProfileData?.openPopUp(PopUpType.ACCOUNT_ACTION_TRANSFER)}>
            <CreditCardIcon className={"icon"}/>
              transfer
          </button>
        </span>
      </span>
    </div>
  );
};

export default AccountInfo;