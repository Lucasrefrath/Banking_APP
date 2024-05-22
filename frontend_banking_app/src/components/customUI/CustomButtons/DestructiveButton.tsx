import React, {useState} from 'react';
import DestructionPopUp from "../../pop-ups/DestructionPopUp";
import {DestructionButtonProps} from "../../../types/GlobalProps";

const DestructiveButton = ({children, onClick, disabled, className, affirmationRequired = false, affirmationMessage}: DestructionButtonProps) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);

  const handleClick= () => {
    if(affirmationRequired) setIsPopUpOpen(true);
    else if (onClick) onClick()
  }

  const handleAffirmation = () => {
    setIsPopUpOpen(false);
    if(onClick) onClick()
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`inline-flex items-center rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 disabled:bg-red-400 ${className}`}
      >
        <div className={"flex gap-2 items-center"}>
          {children}
        </div>
      </button>
      <DestructionPopUp isOpen={isPopUpOpen} affirm={handleAffirmation} close={() => setIsPopUpOpen(false)} message={affirmationMessage}/>
    </>
  );
};

export default DestructiveButton;