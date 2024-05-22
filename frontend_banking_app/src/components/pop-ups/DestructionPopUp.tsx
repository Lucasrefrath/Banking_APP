import React from 'react';
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from "@headlessui/react";
import DestructiveButton from "../customUI/CustomButtons/DestructiveButton";
import OutlineSecondaryButton from "../customUI/CustomButtons/OutlineSecondaryButton";

interface DestructionPopUpProps {
  isOpen: boolean,
  affirm: () => void,
  close: () => void,
  message?: string
}

const DestructionPopUp = ({isOpen, close, affirm, message = "please confirm your action"}: DestructionPopUpProps) => {

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
              <DialogPanel className="w-full max-w-md rounded-xl bg-red-50 p-6 backdrop-blur-sm">
                <DialogTitle as="h3" className="text-xl font-medium text-black">
                  <p className={"font-bold text- xl"}>Confirmation Required</p>
                </DialogTitle>

                <div className={"mt-2"}>
                  <p className={"text-sm"}>{message}</p>
                </div>

                <div className={"flex gap-2 mt-3"}>
                  <OutlineSecondaryButton onClick={close}>cancel</OutlineSecondaryButton>
                  <DestructiveButton onClick={affirm}>confirm</DestructiveButton>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DestructionPopUp;