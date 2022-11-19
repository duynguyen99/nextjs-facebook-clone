import React from "react";
import { RecentUserProps } from "../types/Props";
import { LoginRecentUser } from "./layouts/Login";
import UserAvatar from "./UserAvatar";

const RecentUser = ({ users, setSelectedUser }: RecentUserProps) => {
  return (
    <LoginRecentUser>
      {users?.map((user) => (
        <div
          key={user._id}
          onClick={() => setSelectedUser?.(user)}
          className="mr-4 mt-4"
        >
          <UserAvatar key={user?.id} data={user} />
        </div>
      ))}
    </LoginRecentUser>
  );
};

export default RecentUser;
