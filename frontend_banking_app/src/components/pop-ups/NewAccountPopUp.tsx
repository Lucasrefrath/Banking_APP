import React, {useState} from 'react';
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from "@headlessui/react";
import useCreateAccount from "../../hooks/request/useCreateAccount";
import CustomPopUp from "../customUI/CustomPopUp";

interface NewAccountPopUpProps {
  isOpen: boolean,
  close: () => void
}

const MAX_LENGTH: number = 20

const NewAccountPopUp = ({isOpen, close}: NewAccountPopUpProps) => {
  const [name, setName] = useState<string>("");
  const { handleRequest } = useCreateAccount();

  const validateInput = (): boolean => {
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
    <CustomPopUp isOpen={isOpen} close={close}>
      <DialogTitle>
        <h3>Create New Account</h3>
      </DialogTitle>
      <small>create a new Account</small>

      <section>
        <label>Name</label>
        <input
          name={"name"}
          value={name}
          onChange={(e) => handleNameChange(e)}
          placeholder={"enter account name"}
        />
      </section>

      <section className={"flex gap-2 mt-4"}>
        <button className={"type-secondary"} onClick={close}>Cancel</button>
        <button className={"type-primary"} onClick={handleSubmit}>Create</button>
      </section>
    </CustomPopUp>
  );
};

export default NewAccountPopUp;