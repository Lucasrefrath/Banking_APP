import React from 'react';
import {CustomButtonProps} from "../../../types/GlobalProps";

 const OutlineSecondaryButton = ({children, onClick, className, disabled}: CustomButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:text-gray-500 disabled:hover:bg-white ${className}`}
    >
      <div className={"flex gap-2 items-center"}>
        {children}
      </div>
    </button>
  );
 };

export default OutlineSecondaryButton;