import Image from "next/image";
import React from "react";
import { UserAvatarProps } from "../types/Props";
import { User } from "../types/User";

const UserAvatar = ({data}: UserAvatarProps) => {
  const { name, avatar } = data;
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 hover:shadow-md dark:bg-gray-800 dark:border-gray-700 font-sans cursor-pointer hover:shadow-inner-custom transition ease-in-out">
      <Image
        className="rounded-t-lg w-full h-40"
        src={avatar || ''}
        alt="avatar"
        width="1500"
        height="1500"
      />

      <div className="text-center h-12 text-ellipsis font-normal pt-2">
        {name}
      </div>
    </div>
  );
};

export default UserAvatar;
