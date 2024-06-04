import React from 'react';
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from "@headlessui/react";
import {AccountHistory} from "../../types/Types";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import {AccountAction} from "../../types/Enums";
import useProfileContext from "../../hooks/contextHook/useProfileContext";
import useFormat from "../../utils/useFormat";
import CustomPopUp from "../customUI/CustomPopUp";

interface HistoryPopUpProps {
  history: AccountHistory,
  close: () => void,
  isOpen: boolean,
  isProfit: () => boolean
}

const HistoryPopUp = ({history, isOpen, close, isProfit}: HistoryPopUpProps) => {
  const { userAccount} = useProfileContext();
  const { formatBalance, formatTime, formatDate } = useFormat();

  const getBefore = (): number | string => {
    if(history.transactionType === AccountAction.DEPOSIT) return formatBalance(history.destinationBalanceBefore || undefined);
    if(history.transactionType === AccountAction.WITHDRAW) return formatBalance(history.originBalanceBefore || undefined);
    if(history.destinationAccount?.id === userAccount?.id) return formatBalance(history.destinationBalanceBefore || undefined);
    return formatBalance(history.originBalanceBefore || undefined);
  }

  const getAfter = (): number | string => {
    if(history.transactionType === AccountAction.DEPOSIT) return formatBalance(history.destinationBalanceAfter || undefined);
    if(history.transactionType === AccountAction.WITHDRAW) return formatBalance(history.originBalanceAfter || undefined);
    if(history.destinationAccount?.id === userAccount?.id) return formatBalance(history.destinationBalanceAfter || undefined);
    return formatBalance(history.originBalanceAfter || undefined);
  }

  return (
    <CustomPopUp isOpen={isOpen} close={close}>
      <DialogTitle>
        <small>{formatDate(history.timeStamp)} at {formatTime(history.timeStamp)}</small>
        <h3>{history.transactionType}</h3>
      </DialogTitle>

      <section>
        <label>History</label>
        <div className={"flex gap-1 items-center"}>
          <div className={"pill-gray"}>{`${getBefore()} €`}</div>
          <ChevronRightIcon className="icon text-gray-500" />
          <div className={`pill-gray ${isProfit() ? "text-green-700" : "text-red-700"}`}>{`${isProfit() ? "+" : "-"}${formatBalance(history.amount)} €`}</div>
          <ChevronRightIcon className="icon text-gray-500" />
          <div className={"pill-gray"}>{`${getAfter()} €`}</div>
        </div>
      </section>

      <section>
        <label>Message</label>
        <textarea
          name="description"
          id="description"
          value={history.message || undefined}
          disabled={true}
          rows={2}
          placeholder="no message"
        />
      </section>

      {history.destinationAccount?.id !== userAccount?.id ? (
        <section>
          <label>To</label>
          <input
            name="recipient"
            id="recipient"
            value={history.destinationAccount?.iban || undefined}
            disabled={true}
            placeholder="unknown recipient"
          />
        </section>) : (
        <section>
          <label>From</label>
          <input
            name="origin"
            id="origin"
            value={history.originAccount?.iban || undefined}
            disabled={true}
            placeholder="unknown origin"
          />
        </section>
      )}

      <button className={"type-primary mt-5"} onClick={close}>Done</button>
    </CustomPopUp>
  );
};

export default HistoryPopUp;