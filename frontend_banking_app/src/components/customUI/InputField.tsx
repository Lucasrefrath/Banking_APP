import React from 'react';

interface InputFieldProps {
  label?: string
  name?: string,
  value?: any,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any,
  placeHolder?: string,
  disabled?: boolean
}

const InputField = ({name, value, onChange, placeHolder, disabled, label}: InputFieldProps) => {
  return (
    <div className={"mt-3"}>
      {label && <label className={"text-sm/6 font-medium text-black"}>{label}</label>}
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 bg-black/5 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        placeholder={placeHolder}
        disabled={disabled}
      />
    </div>
  );
};

export default InputField;