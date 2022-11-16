import Image from "next/image";
import React from "react";
import { ModalLoginProps } from "../types/Props";

function ModalLogin({ user, onLogin }: ModalLoginProps) {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={user.avatar || ''}
        width={500}
        height={500}
        alt="avatar"
        className="rounded-full w-40 h-40"
      />
      <div className="mt-2">{user.fullName}</div>
      <div className="mt-4 w-96 flex flex-col items-center">
        <input
          type="password"
          id="password"
          className="h-12 text-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Password"
          required
        />
        <button
          type="button"
          className="text-lg mt-4 h-12 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={onLogin}
        >
          Log in
        </button>
      </div>
    </div>
  );
}

export default ModalLogin;
