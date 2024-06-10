import React from 'react';
import {RequestSignUpResponse} from "../types/Request-Response";
import {CheckIcon, PlusCircleIcon, XMarkIcon} from "@heroicons/react/24/outline";
import useFormat from "../utils/useFormat";
import usePopUpManager from "../hooks/usePopUpManager";
import RequestApprovePopUp from "./pop-ups/RequestApprovePopUp";
import {PopUpType} from "../types/Enums";
import RequestRejectPopUp from "./pop-ups/RequestRejectPopUp";

interface OpenRequestPreviewProps {
  request: RequestSignUpResponse
}

const OpenRequestPreview = ({ request }: OpenRequestPreviewProps) => {
  const { formatTime, formatDate} = useFormat();
  const { isPopUpOpen, openPopUp, closePopUp } = usePopUpManager();

  return (
    <li className={"flex justify-between items-center"}>
      <div>
        <span className={"flex items-center"}>
          {request.username}
        </span>
        <span className={"flex items-center justify-start gap-1"}>
          <PlusCircleIcon className={"icon-small"}/>
          <small>{formatDate(request.createdAt)} at {formatTime(request.createdAt)}</small>
        </span>
      </div>
      <div className={"flex items-center"}>
        <button className={"flex justify-center text-center items-center cursor-pointer"}
                onClick={() => openPopUp(PopUpType.SIGNUP_REQUEST_APPROVE)}>
          <span className={"bg-green-200 pill-round p-3 hover:bg-green-300"}>
            <CheckIcon className={"icon-small text-green-700 "}/>
          </span>
        </button>
        <button className={"flex justify-center text-center items-center cursor-pointer"}
                onClick={() => openPopUp(PopUpType.SIGNUP_REQUEST_REJECT)}>
          <span className={"bg-red-200 pill-round p-3 hover:bg-red-300"}>
            <XMarkIcon className={"icon-small text-red-700 "}/>
          </span>
        </button>
      </div>
      <RequestApprovePopUp isOpen={isPopUpOpen(PopUpType.SIGNUP_REQUEST_APPROVE)} close={() => closePopUp(PopUpType.SIGNUP_REQUEST_APPROVE)} request={request}/>
      <RequestRejectPopUp isOpen={isPopUpOpen(PopUpType.SIGNUP_REQUEST_REJECT)} close={() => closePopUp(PopUpType.SIGNUP_REQUEST_REJECT)} request={request}/>
    </li>
  );
};

export default OpenRequestPreview;