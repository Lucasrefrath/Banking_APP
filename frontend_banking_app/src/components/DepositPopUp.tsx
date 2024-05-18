import React, {useContext, useState} from 'react';
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from "@headlessui/react";
import {ProfileContext} from "../types-const/Context";
import useDeposit from "../hooks/useDeposit";

const DepositPopUp = () => {
  const ProfileData = useContext(ProfileContext);
  const [amount, setAmount] = useState<string>("0")
  const { handleRequest } = useDeposit();

  const handleSubmit = () => {
    const zahl = Number.parseFloat(Number.parseFloat(amount).toFixed(2));
    if(zahl <= 0) {
      return
    }
    console.log(`Deposit ${zahl.toFixed(2)} €`)

    handleRequest({
      accountId: ProfileData?.userAccount?.id || 0,
      amount: zahl
    })
  }

  return (
    <Transition appear show={ProfileData?.isDepositOpen}>
      <Dialog as="div" className="relative z-10 focus:outline-none" onClose={() => ProfileData?.closeDeposit}>
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
                <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                  Deposit to Account
                </DialogTitle>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                />
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    deposit
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DepositPopUp;