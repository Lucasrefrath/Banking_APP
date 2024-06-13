import React, {useEffect, useState} from 'react';
import CustomPopUp, {PopUpWidth} from "../customUI/CustomPopUp";
import {ServerException} from "../../types/Types";
import useTimer from "../../hooks/useTimer";
import {HandRaisedIcon} from "@heroicons/react/24/outline";

interface ErrorPopUpProps {
  error: ServerException | undefined
  clearError: () => void
}

const ServerErrorPopUp = ({ error, clearError }: ErrorPopUpProps) => {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    error !== undefined && openPopUp()
  }, [ error ]);

  const openPopUp = () => {
    setIsOpen(true);
    start(15);
  }

  const closePopUp = () => {
    clearError();
    reset();
    setIsOpen(false);
  }

  const { start, reset, timeLeft} = useTimer(closePopUp);

  return (
    <CustomPopUp isOpen={isOpen} close={closePopUp} width={PopUpWidth.SMALL}>
      <div className={""}>
        <div className={"flex justify-center text-center items-center"}>
            <span className={"bg-red-200 pill-round p-3"}>
              <HandRaisedIcon className={"icon-mid text-red-700 "}/>
            </span>
        </div>
        <section className={"text-center"}>
          <h3>{error?.status} - {error?.error}</h3>
        </section>
        <section className={"text-center text-wrap"}>
          <p>{error?.message}</p>
        </section>
        <section className={"items-center justify-center flex mt-5"}>
          <button className={"type-primary"} onClick={() => closePopUp()}>Try Again!</button>
        </section>
        <section className={"flex justify-center text-center"}>
          <small className={"font-normal text-xs"}>Continues in {timeLeft}</small>
        </section>
      </div>
    </CustomPopUp>
  );
};

export default ServerErrorPopUp;