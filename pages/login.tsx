import { GetServerSideProps } from "next";
import React, { useState } from "react";
import LoginLayout, {
  LoginForm,
  LoginRecentForm,
  LoginRecentWrap,
} from "../components/layouts/Login";
import Modal from "../components/Modal";
import ModalLogin from "../components/modules/ModalLogin";
import RecentUser from "../components/RecentUser";
import { LoginPageProps } from "../types/Props";
import { User } from "../types/Base";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { EMAIL_PATTERN } from "../utils/constants";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Logo from "../components/Logo";
import { toast } from "react-toastify";
import ModalRegister from "../components/modules/ModalRegister";
import Head from "next/head";
import getPastUsersLogin, { getUserByEmails } from "./api/user/past-login";
import Button from "../components/Button";

const LoginPage = ({ users }: LoginPageProps) => {
  const [recentUsers, setRecentUsers] = useState<User[]>(users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState<boolean>(false);
  const [isLoadingSubmitLoginModal, setIsLoadingSubmitLoginModal] =
    useState<boolean>(false);

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
    const response = await signIn("credentials", {
      redirect: false,
      ...data,
    });
    if (response?.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      router.push("/");
    }
  };

  const onSubmitLoginModal = async (password: string) => {
    setIsLoadingSubmitLoginModal(true);
    await onLogin({ ...selectedUser, password });
    setIsLoadingSubmitLoginModal(false);
  };

  const onSubmitLogin = async (data: User) => {
    console.log("call lan nua");
    setIsLoading(true);
    await onLogin(data);
    setIsLoading(false);
  };

  const onRegister = async (data: User) => {
    //TODO: remove hard-code avatar here when had implemented feature upload an avatar
    setIsLoadingRegister(true);
    return fetch("/api/user/register", {
      body: JSON.stringify({
        ...data,
        avatar:
          "https://s3.amazonaws.com/prod.skimble/photos/29359/hstzsdw4avx_iphone.gif",
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Successfully Register!");
          setShowRegisterForm(false);
        }
      })
      .finally(() => {
        setIsLoadingRegister(false);
      });
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
            {recentUsers?.length ? (
              <>
                <h2 className="pt-5 text-2xl">Recent logins</h2>
                <p>Click your picture or add an account.</p>
                <RecentUser
                  users={recentUsers}
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
              errorText={errors.password?.message}
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
              disabled={showRegisterForm}
              className="w-fit mt-4 ml-auto mr-auto text-white bg-[#42b72a] hover:bg-[#36a420] flex"
              onClick={() => setShowRegisterForm(true)}
            />
          </LoginForm>
        </LoginRecentWrap>
        {selectedUser && (
          <Modal onClose={() => setSelectedUser(null)} hideTitle>
            <ModalLogin
              user={selectedUser}
              onLogin={onSubmitLoginModal}
              loading={isLoadingSubmitLoginModal}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { users: emails } = context.req.cookies;
  try {
    const usersDataRes = await getUserByEmails(JSON.parse(emails || "[]"));
    return {
      props: {
        users: usersDataRes,
      },
    };
  } catch (error) {
    return {
      props: {
        users: [],
      },
    };
  }
};

export default LoginPage;
