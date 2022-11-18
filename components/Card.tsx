import React from "react";
import { LayoutProps } from "../types/Props";

const Card = ({children, className}: LayoutProps) => {
  return (
    <div
      className={`block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
