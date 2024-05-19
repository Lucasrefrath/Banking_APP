import React, {ReactElement, useContext, useState} from 'react';
import {AccountHistory} from "../types-const/Types";
import {formatDate, getTimeSince, formatTime, formatBalance} from "../types-const/Utils";
import {ArrowTrendingDownIcon, ArrowTrendingUpIcon} from "@heroicons/react/24/outline";
import HistoryPopUp from "./pop-ups/HistoryPopUp";
import {ProfileContext} from "../types-const/Context";

const HistoryPreviewItem = ({history}: {history: AccountHistory}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ProfileData = useContext(ProfileContext);

  const isProfit = (): boolean => {
    if(history.transactionType === "DEPOSIT") return true;
    if(history.transactionType === "WITHDRAW") return false;

    //TRANSFER
    return history.destinationAccount?.id === ProfileData?.userAccount?.id;
  }

  const getIcon = (): ReactElement => {
    if(isProfit()) {
      return <ArrowTrendingUpIcon className="-ml-0.5 mr-1.5 h-10 w-10 p-2 text-green-700 bg-gray-50 rounded-full" aria-hidden="true" />;
    }
    return <ArrowTrendingDownIcon className="-ml-0.5 mr-1.5 h-10 w-10 p-2 text-red-700 bg-gray-50 rounded-full" aria-hidden="true" />
  }

  const getBalanceText = (): ReactElement => {
    if(isProfit()) {
      return <p className="mt-1 truncate text-sm font-light text-green-700">+{formatBalance(history.amount)} €</p>
    }
    return <p className="mt-1 truncate text-sm font-light text-red-700">-{formatBalance(history.amount)} €</p>
  }

  const closePopUp = () => {
    setIsOpen(false);
  }

  return (
    <li key={history.id} className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-lg font-semibold leading-6 text-gray-900">{history.transactionType} <span className="text-sm font-light ps-1">{formatDate(history.timeStamp)}</span></p>
          {getBalanceText()}
          <button onClick={() => setIsOpen(true)} className={"pt-2 font-light"}>see more</button>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <span className="text-sm font-extralight ps-1 pb-3">{getTimeSince(history.timeStamp)}</span>
        {getIcon()}
      </div>
      <HistoryPopUp history={history} close={closePopUp} isOpen={isOpen} isProfit={isProfit}/>
    </li>
  );
};

export default HistoryPreviewItem;