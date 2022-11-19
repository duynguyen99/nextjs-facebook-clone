import { useRouter } from "next/router";
import React from "react";
import InputSearch from "../InputSearch";
import Logo from "../Logo";
import AvatarDropdown from "../AvatarDropdown";
import { signOut, useSession } from "next-auth/react";
import { User } from "../../types/Base";
import { DEFAULT_AVATAR } from "../../utils/constants";

function MainNavigation() {
  const router = useRouter();

  const { data: session, status } = useSession();
  const user = session?.user as User;

  const onSignOut = async () => {
    const response = await signOut({ redirect: false });
    if (response) {
      router.push("/login");
    }
  };

  return (
    <nav className="h-16 bg-white fixed top-0 w-full bg-white shadow-sm">
      <div className="p-4 pt-3 flex flex-row w-full place-content-between">
        <Logo
          className="text-3xl cursor-pointer"
          onClick={() => router.push("/")}
        />
        <div className="space-x-10 flex w-1/3 pr-20">
          <InputSearch
            className="h-10 rounded-full"
            placeholder="Search on Facebook"
          />
        </div>
        {user && status !== 'loading' && <AvatarDropdown
          dropdownData={[
            {
              id: "1",
              text: "View your profile",
              onClick: () => router.push(`/${user.id}`),
            },
            {
              id: "2",
              text: "Logout",
              onClick: onSignOut,
            },
          ]}
          avatar={user?.avatar || DEFAULT_AVATAR}
        />}
      </div>
    </nav>
  );
}


export default MainNavigation;
