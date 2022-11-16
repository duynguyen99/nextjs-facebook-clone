import React from "react";
import { RecentUserProps } from "../types/Props";
import { RecentUserLayout } from "./Login";
import UserAvatar from "./UserAvatar";

const RecentUser = ({ users, setSelectedUser }: RecentUserProps) => {
  return (
    <RecentUserLayout>
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => setSelectedUser?.(user)}
          className="mr-4 mt-4"
        >
          <UserAvatar key={user.id} data={user} />
        </div>
      ))}
    </RecentUserLayout>
  );
};

export default RecentUser;
