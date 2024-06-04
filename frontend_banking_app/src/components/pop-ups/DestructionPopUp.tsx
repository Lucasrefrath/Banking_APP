import React from 'react';
import {DialogTitle} from "@headlessui/react";
import CustomPopUp, {PopUpWidth} from "../customUI/CustomPopUp";

interface DestructionPopUpProps {
  isOpen: boolean,
  affirm: () => void,
  close: () => void,
  message?: string
}

const DestructionPopUp = ({isOpen, close, affirm, message = "please confirm your action"}: DestructionPopUpProps) => {

  return (
    <CustomPopUp isOpen={isOpen} close={close} width={PopUpWidth.SMALL}>
      <h3>Confirmation Required</h3>

      <section className={"mt-2"}>
        <small>{message}</small>
      </section>

      <section className={"flex gap-2 mt-3"}>
        <button className={"type-secondary-outline"} onClick={close}>cancel</button>
        <button className={"type-destructive"} onClick={affirm}>confirm</button>
      </section>
    </CustomPopUp>
  );
};

export default DestructionPopUp;