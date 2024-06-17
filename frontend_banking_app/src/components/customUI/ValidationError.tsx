import React, {useEffect, useState} from 'react';
import useTimer from "../../hooks/useTimer";
import {HandRaisedIcon} from "@heroicons/react/24/outline";

interface ValidationErrorProps {
  error: string
  clearError: () => void
}

const ValidationError = ({ error, clearError }: ValidationErrorProps) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    error !== "" && openPopUp()
  }, [ error ]);

  const openPopUp = () => {
    setIsOpen(true);
    //start(15);
  }

  const closePopUp = () => {
    clearError();
    reset();
    setIsOpen(false);
  }

  const { start, reset, timeLeft} = useTimer(closePopUp);

  if(error === "") return <></>;

  return (
      <span className={"bg-red-200 pill-red items-center"}>
        <span className={"bg-red-200 pill-round p-3"}>
          <HandRaisedIcon className={"icon-mid text-red-700 "}/>
        </span>
        <span>
          {error}
        </span>
      </span>
  );
};

export default ValidationError;