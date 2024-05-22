import React, {ReactElement, useContext, useState} from 'react';
import {AccountHistory} from "../types/Types";
import {formatBalance, formatDate, getTimeSince} from "../utils/Utils";
import {ArrowTrendingDownIcon, ArrowTrendingUpIcon} from "@heroicons/react/24/outline";
import HistoryPopUp from "./pop-ups/HistoryPopUp";
import {ProfileContext} from "../const/Context";
import usePopUpManager from "../hooks/usePopUpManager";
import {AccountAction, PopUpType} from "../types/Enums";

const HistoryPreviewItem = ({history}: {history: AccountHistory}) => {
  const ProfileData = useContext(ProfileContext);
  const {openPopUp, closePopUp, isPopUpOpen} = usePopUpManager();

  const isProfit = (): boolean => {
    if(history.transactionType === AccountAction.DEPOSIT) return true;
    if(history.transactionType === AccountAction.WITHDRAW) return false;

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

  return (
    <li key={history.id} className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-lg font-semibold leading-6 text-gray-900">{history.transactionType} <span className="text-sm font-light ps-1">{formatDate(history.timeStamp)}</span></p>
          {getBalanceText()}
          <button onClick={() => openPopUp(PopUpType.ACCOUNT_VIEW_SHOW_HISTORY)} className={"pt-2 text-gray-500 text-sm font-light"}>see more</button>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <span className="text-sm font-extralight ps-1 pb-3">{getTimeSince(history.timeStamp)}</span>
        {getIcon()}
      </div>
      <HistoryPopUp
        history={history}
        close={() => closePopUp(PopUpType.ACCOUNT_VIEW_SHOW_HISTORY)}
        isOpen={isPopUpOpen(PopUpType.ACCOUNT_VIEW_SHOW_HISTORY)}
        isProfit={isProfit}
      />
    </li>
  );
};

export default HistoryPreviewItem;