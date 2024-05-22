import React from 'react';
import {CustomButtonProps} from "../../../types/GlobalProps";

 const SecondaryButton = ({children, onClick, className}: CustomButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center rounded-md bg-gray-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className} `}
    >
      <div className={"flex gap-2 items-center"}>
        {children}
      </div>
    </button>
  );
};

export default SecondaryButton;