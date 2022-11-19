import React from "react";
import { ButtonProps } from "../types/Props";
import { BUTTON_STYLE_MAPPING } from "../utils/constants";
import Spin from "./Spin";

const Button = ({ title, className, loading, buttonType, disabled, ...restProps }: ButtonProps) => {
  return (
    <button
      type="button"
      {...restProps}
      disabled={disabled}
      className={`text-white ${BUTTON_STYLE_MAPPING[buttonType || 'primary']} items-center font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className} ${(loading || disabled) ? 'cursor-not-allowed bg-blue-300' : ''}`}
    >
      {loading && (
        <Spin />
      )}
      {title}
    </button>
  );
};

export default Button;
