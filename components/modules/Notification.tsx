import React from "react";
const Notification = () => {
  return (
    <div
      id="dropdown"
      className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
    >
      <ul
        className="py-1 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefault"
      >
        <li>
          <a
            href="#"
            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Settings
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Earnings
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Sign out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Notification;
