import React from 'react';
import {Dialog, DialogPanel, Transition, TransitionChild} from "@headlessui/react";

interface CustomPopUpProps {
  children: any,
  isOpen: boolean,
  close: () => void,
  width?: PopUpWidth
}

export enum PopUpWidth {
  FULL = "full",
  SMALL = "1/4",
}

const CustomPopUp = ({ children, isOpen, close, width = PopUpWidth.FULL }: CustomPopUpProps) => {
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
              <DialogPanel className={`w-${width} max-w-lg rounded-xl bg-black/5 p-6 backdrop-blur-2xl`}>
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomPopUp;