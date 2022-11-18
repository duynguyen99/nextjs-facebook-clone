import React from "react";
import { DropdownProps } from "../types/Props";

const Dropdown = (props: DropdownProps) => {
  return (
    <div
      id="dropdown"
      className="z-10 w-max bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 absolute right-0"
    >
      <ul
        className="py-1 text-sm text-gray-700 dark:text-gray-200 border shadow-md"
      >
        {props?.data.map((item) => 
          <li key={item.id} onClick={() => {
            item.onClick?.();
            props.setIsShowDropdown(false);
          }}>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {item.text}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Dropdown;
