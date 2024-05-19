import React, {ReactElement, useContext} from 'react';
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from "@headlessui/react";
import {AccountHistory} from "../../types-const/Types";
import {formatBalance, formatDate, formatTime} from "../../types-const/Utils";
import {ProfileContext} from "../../types-const/Context";
import {CurrencyEuroIcon} from "@heroicons/react/24/solid";
import {ChevronDoubleRightIcon, ChevronRightIcon} from "@heroicons/react/24/outline";

interface HistoryPopUpProps {
  history: AccountHistory,
  close: () => void,
  isOpen: boolean,
  isProfit: () => boolean
}

const AccountActionPopUp = ({history, isOpen, close, isProfit}: HistoryPopUpProps) => {
  const ProfileData = useContext(ProfileContext);

  const getBefore = (): number | string => {
    if(history.transactionType === "DEPOSIT") return formatBalance(history.destinationBalanceBefore || undefined);
    if(history.transactionType === "WITHDRAW") return formatBalance(history.originBalanceBefore || undefined);
    if(history.destinationAccount?.id === ProfileData?.userAccount?.id) return formatBalance(history.destinationBalanceBefore || undefined);
    return formatBalance(history.originBalanceBefore || undefined);
  }

  const getAfter = (): number | string => {
    if(history.transactionType === "DEPOSIT") return formatBalance(history.destinationBalanceAfter || undefined);
    if(history.transactionType === "WITHDRAW") return formatBalance(history.originBalanceAfter || undefined);
    if(history.destinationAccount?.id === ProfileData?.userAccount?.id) return formatBalance(history.destinationBalanceAfter || undefined);
    return formatBalance(history.originBalanceAfter || undefined);
  }

  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-black/5 p-6 backdrop-blur-2xl">
                <DialogTitle as="h3" className="text-xl font-medium text-black">
                  <p
                    className={"text-sm font-extralight"}>{formatDate(history.timeStamp)} at {formatTime(history.timeStamp)}</p>
                  <p className={"text-xl"}>{history.transactionType}</p>
                </DialogTitle>

                <div className={"mt-3"}>
                  <label className={"text-sm/6 font-medium text-black"}>History</label>
                  <div className={"flex gap-1 items-center"}>
                    <div className={"bg-gray-300 px-2 py-1 rounded-xl text-sm"}>{`${getBefore()} €`}</div>
                    <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                    <div className={`bg-gray-300 px-2 py-1 rounded-xl text-sm ${isProfit() ? "text-green-700" : "text-red-700"}`}>{`${isProfit() ? "+" : "-"}${formatBalance(history.amount)} €`}</div>
                    <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                    <div className={"bg-gray-300 px-2 py-1 rounded-xl text-sm"}>{`${getAfter()} €`}</div>

                  </div>
                </div>

                <div className={"mt-3"}>
                  <label className={"text-sm/6 font-medium text-black"}>Message</label>
                  <textarea
                    name="description"
                    id="description"
                    value={history.message || undefined}
                    disabled={true}
                    rows={2}
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 bg-black/5 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="no message"
                  />
                </div>

                {history.destinationAccount?.id !== ProfileData?.userAccount?.id ? (
                  <div className={"mt-3"}>
                    <label className={"text-sm/6 font-medium text-black"}>To</label>
                    <input
                      name="recipient"
                      id="recipient"
                      value={history.destinationAccount?.id || undefined}
                      disabled={true}
                      className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 bg-black/5 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      placeholder="unknown recipient"
                    />
                  </div>) : (
                  <div className={"mt-3"}>
                    <label className={"text-sm/6 font-medium text-black"}>From</label>
                    <input
                      name="origin"
                      id="origin"
                      value={history.originAccount?.id || undefined}
                      disabled={true}
                      className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 bg-black/5 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      placeholder="unknown origin"
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={close}
                  className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  done
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AccountActionPopUp;