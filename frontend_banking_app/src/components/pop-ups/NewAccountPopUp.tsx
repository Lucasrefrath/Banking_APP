import React, {useState} from 'react';
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from "@headlessui/react";
import SecondaryButton from "../customUI/CustomButtons/SecondaryButton";
import PrimaryButton from "../customUI/CustomButtons/PrimaryButton";
import InputField from "../customUI/InputField";
import useCreateAccount from "../../hooks/request/useCreateAccount";

interface NewAccountPopUpProps {
  isOpen: boolean,
  close: () => void
}

const MAX_LENGTH: number = 20

const NewAccountPopUp = ({isOpen, close}: NewAccountPopUpProps) => {
  const [name, setName] = useState<string>("");
  const { handleRequest } = useCreateAccount();

  const validateInput = (): boolean => {
    console.log(name.trim())
    if(name.trim() === "") setName("")
    return name.length < MAX_LENGTH;
  }

  const handleSubmit = () => {
    if(!validateInput()) return

    handleRequest({
      name: name
    });

    setName("");
    close()
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length > MAX_LENGTH) return;
    setName(e.target.value);
  }

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
              <DialogPanel className="w-full max-w-md rounded-xl bg-black/5 p-6 backdrop-blur-2xl">
                <DialogTitle as="h3" className="text-xl font-medium text-black">
                  <p>Create New Account</p>
                </DialogTitle>

                <InputField
                  label={"Name"}
                  name={"name"}
                  value={name}
                  onChange={(e) => handleNameChange(e)}
                  placeHolder={"enter account name"}
                />

                <div className={"flex gap-2 mt-4"}>
                  <SecondaryButton onClick={close}>cancel</SecondaryButton>
                  <PrimaryButton onClick={handleSubmit}>create</PrimaryButton>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NewAccountPopUp;