import Image from "next/image";
import React from "react";
import { UserAvatarProps } from "../types/Props";
import { User } from "../types/Base";

const UserAvatar = ({ data, className }: UserAvatarProps) => {
  const { fullName, avatar } = data;
  return (
    <div
      className={`w-full bg-white rounded-lg border border-gray-200 hover:shadow-md dark:bg-gray-800 dark:border-gray-700 font-sans cursor-pointer hover:shadow-inner-custom transition ease-in-out ${className || ''}`}
    >
      <Image
        className="rounded-t-lg w-full lg:h-40 h-20 min-w-[110px]"
        src={avatar || ""}
        alt="avatar"
        width="1500"
        height="1500"
      />

      <div className="flex items-center m-auto w-full justify-center text-center lg:h-12 h-12 text-ellipsis font-normal bg-white border-t rounded-sm sm:text-base text-sm">
        {fullName}
      </div>
    </div>
  );
};

export default UserAvatar;
