import React, {useEffect, useState} from 'react';
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from "@headlessui/react";
import useAccountAction from "../../hooks/request/useAccountAction";
import {getAccountActionConfig} from "../../const/GlobalConst";
import NoticeMessage from "../NoticeMessage";
import {AccountAction, MessageLevel, PopUpType} from "../../types/Enums";
import AccountSearchBar from "../AccountSearchBar";
import useProfileContext from "../../hooks/contextHook/useProfileContext";
import CustomPopUp from "../customUI/CustomPopUp";
import ExpectingApprovalPopUp from "./ExpectingApprovalPopUp";

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
  const { userAccount, isPopUpOpen, closePopUp } = useProfileContext();
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

    if(config.testBalance && (data.amount >= (userAccount?.balance || 0.0))) {
      setNotice("To little balance for this transaction")
      setButtonActive(true);
      return;
    }

    handleRequest({
      accountId: userAccount?.id || 0,
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
    <CustomPopUp isOpen={isPopUpOpen(popUpType)} close={() => closePopUp(popUpType)}>
      <DialogTitle as="h2">
        {config.heading}
      </DialogTitle>
      <small className={"mb-4"}>{config.description}</small>

      {config.selectRecipient && (
        <section className={"mt-3"}>
          <label>Recipient</label>
          <AccountSearchBar changeData={changeData}/>
        </section>
      )}

      <section className={"mt-3"}>
        <label>Amount</label>
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
          placeholder="0.00"
        />
      </section>

      {config.writeMessage && (
        <section className={"mt-3"}>
          <label>Description</label>
          <textarea
            rows={3}
            name={"description"}
            placeholder={"enter transfer description"}
            value={data.description}
            onChange={e => changeData(e.target.name, e.target.value)}
          />
        </section>
      )}

      {error && (
        <NoticeMessage message={error.message} onClick={clearError} level={MessageLevel.ERROR} />
      )}

      {notice && (
        <NoticeMessage message={notice} onClick={clearNotice} level={MessageLevel.NOTICE} />
      )}

      <section className="flex mt-5 gap-2">
        <button
          className={"type-secondary"}
          onClick={() => closePopUp(popUpType)}
        >
          cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!buttonActive}
          className={"type-primary"}
        >
          {config.action}
        </button>
      </section>
    </CustomPopUp>

  );
};

export default AccountActionPopUp;