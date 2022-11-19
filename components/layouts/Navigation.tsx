import { useRouter } from "next/router";
import React, { useState } from "react";
import InputSearch from "../InputSearch";
import Logo from "../Logo";
import AvatarDropdown from "../AvatarDropdown";
import { signIn, signOut, useSession } from "next-auth/react";
import { FormLogin, User } from "../../types/Base";
import { DEFAULT_AVATAR } from "../../utils/constants";
import ModalLogin from "../modules/ModalLogin";
import Modal from "../Modal";
import Button from "../Button";

function MainNavigation() {
  const router = useRouter();
  const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false);
  const [isShowModalLogin, setIsShowModalLogin] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const user = session?.user as User;

  const onSignOut = async () => {
    const response = await signOut({ redirect: false });
    if (response) {
      router.push("/login");
    }
  };

  const onLogin = async (data: FormLogin) => {
    setIsLoadingModal(true);
    setIsError(false);
    const response = await signIn("credentials", {
      redirect: false,
      ...data,
    });

    if (response?.ok) {
      router.push("/");
    }

    setIsError(!response?.ok);
    setIsLoadingModal(false);
    return response;
  };

  const onRedirectToHomePage = () => {
    if (session) {
      router.push("/");
    }
  };

  return (
    <nav className="h-16 bg-white fixed top-0 w-full bg-white shadow-sm">
      <div className="p-4 pt-3 flex flex-row w-full place-content-between">
        <Logo
          className={`text-3xl ${session ? "cursor-pointer" : ""}`}
          onClick={onRedirectToHomePage}
        />
        <div className="space-x-10 flex lg:w-1/3 w-2/4 lg:pr-20 lg:text-base">
          <InputSearch
            className="h-10 rounded-full"
            placeholder="Search anything"
          />
        </div>
        <div className="w-10 h-10 min-w-fit min-h-fit">
          {user && status !== "loading" ? (
            <AvatarDropdown
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
            />
          ) : (
            <Button
              buttonType="primary"
              title="Login"
              onClick={() => setIsShowModalLogin(true)}
            />
          )}
        </div>
      </div>
      {isShowModalLogin && (
        <Modal hideTitle onClose={() => setIsShowModalLogin(false)}>
          <ModalLogin
            onLogin={onLogin}
            loading={isLoadingModal}
            isErrorInCorrectPasswordModal={isError}
          />
        </Modal>
      )}
    </nav>
  );
}

export default MainNavigation;
