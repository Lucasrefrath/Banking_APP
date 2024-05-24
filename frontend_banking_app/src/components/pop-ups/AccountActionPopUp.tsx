import React, {useContext, useEffect, useState} from 'react';
import {Checkbox, Dialog, DialogPanel, DialogTitle, Switch, Transition, TransitionChild} from "@headlessui/react";
import {ProfileContext} from "../../const/Context";
import useAccountAction from "../../hooks/request/useAccountAction";
import {getAccountActionConfig} from "../../const/GlobalConst";
import NoticeMessage from "../NoticeMessage";
import PrimaryButton from "../customUI/CustomButtons/PrimaryButton";
import SecondaryButton from "../customUI/CustomButtons/SecondaryButton";
import {AccountAction, MessageLevel, PopUpType} from "../../types/Enums";
import InputField from "../customUI/InputField";
import {CheckIcon} from "@heroicons/react/24/outline";
import AccountSearchBar from "../AccountSearchBar";

interface DataProps {
  recipient: number | undefined,
  amount: number | undefined,
  description: string
}

const standard: DataProps = {
  recipient: undefined,
  amount: undefined,
  description: ""
}

const AccountActionPopUp = ({actionType, popUpType}: {actionType: AccountAction, popUpType: PopUpType}) => {
  const ProfileData = useContext(ProfileContext);
  const { handleRequest, error, setError } = useAccountAction({actionType, popUpType});
  const config = getAccountActionConfig(actionType);

  const [data, setData] = useState<DataProps>(standard)

  const [buttonActive, setButtonActive] = useState(true);
  const [notice, setNotice] = useState<string | undefined>(undefined)

  const handleSubmit = () => {
    setNotice(undefined);
    setError(undefined);
    setButtonActive(false);

    if(!data.recipient && config.selectRecipient) {
      setNotice("No Recipient selected!")
      setButtonActive(true);
      return
    }

    if(data.amount === undefined || data.amount <= 0) {
      setNotice("Amount has to be greater than 0")
      setButtonActive(true);
      return;
    }

    if(config.testBalance && (data.amount >= (ProfileData?.userAccount?.balance || 0.0))) {
      setNotice("To little balance for this transaction")
      setButtonActive(true);
      return;
    }

    handleRequest({
      accountId: ProfileData?.userAccount?.id || 0,
      recipientId: data.recipient,
      message: data.description,
      amount: data.amount
    })

    setData(standard);
  }

  useEffect(() => {
    if(error !== undefined) {
      setButtonActive(true);
    }
  }, [error]);

  const clearNotice = () => {
    setNotice(undefined);
  }

  const clearError = () => {
    setError(undefined);
  }

  const changeData = (prop: string, value: any) => {
    setData({
        ...data,
        [prop]: value
      })
  }

  return (
    <Transition appear show={ProfileData?.isPopUpOpen(popUpType)}>
      <Dialog as="div" className="relative z-10 focus:outline-none" onClose={() => ProfileData?.closePopUp(popUpType)}>
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
              <DialogPanel className="w-full max-w-lg rounded-xl bg-black/5 p-6 backdrop-blur-2xl">
                <DialogTitle as="h3" className="text-xl font-medium text-black">
                  {config.heading}
                </DialogTitle>
                <p className={"font-light text-sm mb-4"}>{config.description}</p>

                {config.selectRecipient && (
                  <div className={"mt-3"}>
                    <label className={"text-sm/6 font-medium text-black"}>Recipient</label>
                    <AccountSearchBar changeData={changeData}/>
                  </div>
                )}

                <div className={"mt-3"}>
                  <label className={"text-sm/6 font-medium text-black"}>Amount</label>
                  <input
                    type="number"
                    name="amount"
                    id="price"
                    value={data.amount}
                    onChange={(e) => {
                      changeData(
                        e.target.name,
                        Number.parseFloat(Number.parseFloat(e.target.value).toFixed(2)) || undefined
                      )}}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 bg-black/5 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="0.00"
                  />
                </div>

                {config.writeMessage && (
                  <div className={"mt-3"}>
                    <label className="text-sm/6 font-medium text-black">Description</label>
                    <textarea
                      className={'block w-full rounded-md border-0 py-1.5 pl-7 pr-20 bg-black/5 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'}
                      rows={3}
                      name={"description"}
                      placeholder={"enter transferdescription"}
                      value={data.description}
                      onChange={e => changeData(e.target.name, e.target.value)}
                    />
                  </div>
                )}

                {error && (
                  <NoticeMessage message={error.message} onClick={clearError} level={MessageLevel.ERROR} />
                )}

                {notice && (
                  <NoticeMessage message={notice} onClick={clearNotice} level={MessageLevel.NOTICE} />
                )}

                <div className="flex mt-5 gap-2">
                  <SecondaryButton onClick={() => ProfileData?.closePopUp(popUpType)}>
                    cancel
                  </SecondaryButton>
                  <PrimaryButton onClick={handleSubmit} disabled={!buttonActive}>
                    {config.action}
                  </PrimaryButton>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AccountActionPopUp;