import React from 'react';
import {ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {MessageLevel} from "../types/Enums";

interface NoticeMessageProps {
  message: string,
  onClick?: () => any,
  level: MessageLevel
}

const NoticeMessage = ({level, message, onClick}: NoticeMessageProps) => {

  if(level === MessageLevel.ERROR) {
    return (
      <div className={"bg-red-200 px-3 py-2 mt-2 rounded-xl"}>
        <div className={"flex justify-between"}>
          <div className={"flex gap-1 items-center"}>
            <ExclamationTriangleIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-red-500"/>
            <p className={"text-red-500 font-bold"}>ERROR</p>
          </div>
          <XMarkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-red-500" onClick={onClick}/>
        </div>
        <p className={"text-red-500 font-light"}>{message}</p>
      </div>
    );
  }

  return (
    <div className={"bg-orange-200 px-3 py-2 mt-2 rounded-xl"}>
      <div className={"flex justify-between"}>
        <div className={"flex gap-1 items-center"}>
          <InformationCircleIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-orange-600"/>
          <p className={"text-orange-600 font-bold"}>NOTICE</p>
        </div>
        <XMarkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-orange-600" onClick={onClick}/>
      </div>
      <p className={"text-orange-600 font-light"}>{message}</p>
    </div>
  );
};

export default NoticeMessage;