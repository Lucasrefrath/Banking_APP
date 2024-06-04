import React, {useState} from 'react';
import DestructionPopUp from "../pop-ups/DestructionPopUp";
import {DestructionButtonProps} from "../../types/GlobalProps";

const DestructiveButton = ({children, onClick, disabled, className, affirmationMessage}: DestructionButtonProps) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);

  const handleClick= () => {
    setIsPopUpOpen(true);
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
        className={`type-destructive ${className}`}
      >
       {children}
      </button>
      <DestructionPopUp isOpen={isPopUpOpen} affirm={handleAffirmation} close={() => setIsPopUpOpen(false)} message={affirmationMessage}/>
    </>
  );
};

export default DestructiveButton;