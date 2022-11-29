import React, { useEffect, useState } from "react";
import LoginLayout, {
  LoginForm,
  LoginRecentForm,
  LoginRecentWrap,
} from "../components/layouts/Login";
import Modal from "../components/Modal";
import ModalLogin from "../components/modules/ModalLogin";
import RecentUser from "../components/RecentUser";
import { LoginPageProps } from "../types/Props";
import { FormLogin, User } from "../types/Base";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import {
  DEFAULT_AVATAR,
  EMAIL_PATTERN,
  ERROR_MESSAGES,
} from "../utils/constants";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Logo from "../components/Logo";
import { toast } from "react-toastify";
import ModalRegister from "../components/modules/ModalRegister";
import Head from "next/head";
import Button from "../components/Button";
import Skeleton from "../components/Skeleton";

const LoginPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState<boolean>(false);
  const [isErrorInCorrectPasswordModal, setIsErrorIncorrectPasswordModal] =
    useState<boolean>(false);
  const [isErrorInCorrectPasswordForm, setIsErrorIncorrectPasswordForm] =
    useState<boolean>(false);
  const [isLoadingSubmitLoginModal, setIsLoadingSubmitLoginModal] =
    useState<boolean>(false);
  const [pastUsers, setPastUsers] = useState<User[] | null>(null);
  const [isLoadingGetPastUsers, setIsLoadingGetPastUsers] =
    useState<boolean>(true);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onLogin = async (data: User) => {
    if (isLoading || isLoadingSubmitLoginModal) {
      return;
    }
    setIsErrorIncorrectPasswordModal(false);
    setIsErrorIncorrectPasswordForm(false);
    const response = await signIn("credentials", {
      redirect: false,
      ...data,
    });

    if (response?.ok) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      users.push(data.email);
      localStorage.setItem("users", JSON.stringify(users));
      router.push("/");
    }
    return response;
  };

  const onSubmitLoginModal = async ({ password }: FormLogin) => {
    setIsLoadingSubmitLoginModal(true);
    setIsErrorIncorrectPasswordModal(false);
    const result = await onLogin({ ...selectedUser, password });
    setIsErrorIncorrectPasswordModal(!!result?.error && result.status === 401);
    setIsLoadingSubmitLoginModal(false);
  };

  const onSubmitLogin = async (data: User) => {
    setIsLoading(true);
    setIsErrorIncorrectPasswordForm(false);
    const result = await onLogin(data);
    setIsErrorIncorrectPasswordForm(!!result?.error && result.status === 401);
    setIsLoading(false);
  };

  const onRegister = async (data: User, callback?: (msg: string) => void) => {
    //TODO: remove hard-code avatar here when had implemented feature upload an avatar
    setIsLoadingRegister(true);
    return fetch("/api/user/register", {
      body: JSON.stringify({
        ...data,
        avatar: DEFAULT_AVATAR,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.ok) {
          toast.success("Successfully Register!");
          setShowRegisterForm(false);
          return;
        }
        return Promise.reject(res);
      })
      .catch(async (error) => {
        const errorMsg = await error.json();
        callback?.(errorMsg?.message);
      })
      .finally(() => {
        setIsLoadingRegister(false);
      });
  };

  const onShowLoginForm = () => {
    if (isLoading) {
      return;
    }

    setShowRegisterForm(true);
  };

  const getPastUsersLogin = () => {
    setIsLoadingGetPastUsers(true);
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (!users?.length) {
      setIsLoadingGetPastUsers(false);
      return;
    }
    fetch("/api/user/past-login", {
      method: "POST",
      body: JSON.stringify({ users }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("an error occurred when fetch data past login");
        }
        const users = await res.json();
        setPastUsers(users);
      })
      .catch((e) => {})
      .finally(() => {
        setIsLoadingGetPastUsers(false);
      });
  };

  useEffect(() => {
    getPastUsersLogin();
  }, []);

  const onKeyUpLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmitLogin)();
    }
  };

  return (
    <>
      <Head>
        <title>Facebook Login and Register</title>
        <meta
          content="Login and register with facebook"
          title="Facebook Login and Register"
        />
      </Head>
      <LoginLayout>
        <LoginRecentWrap>
          <LoginRecentForm>
            <Logo />
            {isLoadingGetPastUsers ? (
              <Skeleton />
            ) : pastUsers && pastUsers?.length ? (
              <>
                <h2 className="pt-5 text-2xl text-center md:text-left">
                  Recent logins
                </h2>
                <p className="text-center md:text-left">
                  Click your picture or add an account.
                </p>
                <RecentUser
                  users={pastUsers}
                  setSelectedUser={setSelectedUser}
                />
              </>
            ) : (
              <p className="pt-5 text-4xl">
                Facebook helps you connect and share with the people in your
                life.
              </p>
            )}
          </LoginRecentForm>
          <LoginForm>
            <div>
              <Input
                type="email"
                placeholder="Email"
                errorText={errors.email?.message}
                onKeyUp={onKeyUpLogin}
                registerForm={{
                  ...register("email", {
                    required: {
                      value: true,
                      message: "This field is required.",
                    },
                    pattern: {
                      value: EMAIL_PATTERN,
                      message: "Invalid email address.",
                    },
                  }),
                }}
              />
            </div>
            <Input
              type="password"
              placeholder="Password"
              errorText={
                errors.password?.message ||
                (isErrorInCorrectPasswordForm
                  ? ERROR_MESSAGES.incorrectPassword
                  : "")
              }
              onKeyUp={onKeyUpLogin}
              className="mt-4"
              registerForm={{
                ...register("password", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                }),
              }}
            />
            <Button
              title="Log in"
              className="w-full mt-4"
              loading={isLoading}
              disabled={isLoading}
              onClick={handleSubmit(onSubmitLogin)}
            />
            <div className="divide-y h-[1px] divide-slate-700 border-b pt-2" />
            <Button
              title="Create New Account"
              buttonType="secondary"
              disabled={showRegisterForm}
              className="w-fit mt-4 ml-auto mr-auto flex"
              onClick={onShowLoginForm}
            />
          </LoginForm>
        </LoginRecentWrap>
        {selectedUser && (
          <Modal onClose={() => setSelectedUser(null)} hideTitle>
            <ModalLogin
              user={selectedUser}
              onLogin={onSubmitLoginModal}
              loading={isLoadingSubmitLoginModal}
              isErrorInCorrectPasswordModal={isErrorInCorrectPasswordModal}
            />
          </Modal>
        )}
        {showRegisterForm && (
          <Modal
            onClose={() => setShowRegisterForm(false)}
            descriptionTitle={`It's quick and easy.`}
            title="Sign Up"
          >
            <ModalRegister
              onRegister={onRegister}
              loading={isLoadingRegister}
            />
          </Modal>
        )}
      </LoginLayout>
    </>
  );
};

export default LoginPage;
