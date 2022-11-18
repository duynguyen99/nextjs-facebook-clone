import React, { FC } from "react";
import { InputProps } from "../types/Props";

const Input: FC<InputProps> = ({
  registerForm,
  errorText,
  name,
  className,
  ...inputProps
}: InputProps) => {
  return (
    <>
      <input
        className={` h-12 text-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
        ${errorText ? "border-1 border-rose-600 " : ""} ${className}`}
        {...inputProps}
        {...registerForm}
      />
      {errorText && <div className="text-red-600 mt-2">{errorText}</div>}
    </>
  );
};

export default Input;
