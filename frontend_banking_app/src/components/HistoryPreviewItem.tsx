import React, {ReactElement } from 'react';
import {AccountHistory} from "../types/Types";
import {ArrowTrendingDownIcon, ArrowTrendingUpIcon} from "@heroicons/react/24/outline";
import HistoryPopUp from "./pop-ups/HistoryPopUp";
import usePopUpManager from "../hooks/usePopUpManager";
import {AccountAction, PopUpType} from "../types/Enums";
import useProfileContext from "../hooks/contextHook/useProfileContext";
import useFormat from "../utils/useFormat";
import useTimeSince from "../utils/useTimeSince";

const HistoryPreviewItem = ({history}: {history: AccountHistory}) => {
  const { userAccount } = useProfileContext();
  const {openPopUp, closePopUp, isPopUpOpen} = usePopUpManager();
  const { formatBalance, formatDate } = useFormat();
  const { getTimeSince } = useTimeSince();

  const isProfit = (): boolean => {
    if(history.transactionType === AccountAction.DEPOSIT) return true;
    if(history.transactionType === AccountAction.WITHDRAW) return false;

    //TRANSFER
    return history.destinationAccount?.id === userAccount?.id;
  }

  const getIcon = (): ReactElement => {
    if(isProfit()) {
      return <ArrowTrendingUpIcon className="h-10 w-10 p-2 text-green-700 bg-gray-50 rounded-full" />;
    }
    return <ArrowTrendingDownIcon className="h-10 w-10 p-2 text-red-700 bg-gray-50 rounded-full" />
  }

  const getBalanceText = (): ReactElement => {
    if(isProfit()) {
      return <p className="mt-1 truncate text-sm font-light text-green-700">+{formatBalance(history.amount)} €</p>
    }
    return <p className="mt-1 truncate text-sm font-light text-red-700">-{formatBalance(history.amount)} €</p>
  }

  return (
    <li key={history.id} className="flex justify-between gap-x-6 py-5">
      <span className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-lg font-semibold">{history.transactionType} <small className="ps-1">{formatDate(history.timeStamp)}</small></p>
          {getBalanceText()}
          <button onClick={() => openPopUp(PopUpType.ACCOUNT_VIEW_SHOW_HISTORY)} className={"type-see-more"}>
            see more
          </button>
        </div>
      </span>
      <span className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <small className="ps-1 pb-3">{getTimeSince(history.timeStamp)}</small>
        {getIcon()}
      </span>
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