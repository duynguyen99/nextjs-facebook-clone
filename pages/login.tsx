import { GetServerSideProps } from "next";
import React, { useState } from "react";
import LoginLayout, {
  LoginFormLayout,
  RecentLogin,
  RecentLoginWrap,
} from "../components/Login";
import Modal from "../components/Modal";
import ModalLogin from "../components/ModalLogin";
import ModalRegister from "../components/ModalRegister";
import RecentUser from "../components/RecentUser";
import { LoginPageProps } from "../types/Props";
import { User } from "../types/User";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { EMAIL_PATTERN } from "../utils/constants";
import { useRouter } from "next/router";
import {signIn} from 'next-auth/react';

const LoginPage = ({ users }: LoginPageProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  const watchAll = watch();

  const onLogin = async (data: User) => {
    setIsLoading(true);
    const response = await signIn('credentials', {
      redirect: false,
      ...data,
    })
    if(response?.ok){
      router.push('/')
    }
    setIsLoading(false);
  };

  const onRegister = () => {};

  console.log("watchAll", watchAll);
  console.log("error", errors);
  return (
    <LoginLayout>
      <RecentLoginWrap>
        <RecentLogin>
          <h2 className="bg-clip-text text-5xl font-bold text-transparent bg-[#1877F2]">
            facebook
          </h2>
          <h2 className="pt-5 text-2xl">Recent logins</h2>
          <p className="">Click your picture or add an account.</p>
          <RecentUser users={users} setSelectedUser={setSelectedUser} />
        </RecentLogin>
        <LoginFormLayout>
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
            registerForm={{
              ...register("password", {
                required: {
                  value: true,
                  message: "This field is required.",
                },
              }),
            }}
          />
          <button
            type="button"
            className="disabled:bg-slate-200 text-xl mt-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleSubmit(onLogin)}
            disabled={isLoading}
          >
            Log in
          </button>
          <div className="divide-y h-[1px] divide-slate-700 border-b pt-2" />
          <button
            type="button"
            className="flex text-xl ml-auto mr-auto mt-4 w-fit text-white bg-[#42b72a] hover:bg-[#36a420] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => setShowRegisterForm(true)}
          >
            Create New Account
          </button>
        </LoginFormLayout>
      </RecentLoginWrap>
      {selectedUser && (
        <Modal onClose={() => setSelectedUser(null)} hideTitle>
          <ModalLogin user={selectedUser} onLogin={handleSubmit(onLogin)} />
        </Modal>
      )}
      {showRegisterForm && (
        <Modal
          onClose={() => setShowRegisterForm(false)}
          descriptionTitle={`It's quick and easy.`}
          title="Sign Up"
        >
          <ModalRegister onRegister={onRegister} />
        </Modal>
      )}
    </LoginLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const users: User[] = [
    {
      id: "1",
      name: "Duy1",
      fullName: "Văn Nguyễn Duy1",
      avatar:
        "https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-1/138317164_1579505722244254_2206959289389356615_n.jpg?stp=dst-jpg_p160x160&_nc_cat=102&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=xDD6M5wYHdAAX_UWGgp&_nc_ht=scontent.fhan2-1.fna&oh=00_AfABEsat-q98f66evyS7FGGSv_4k0QO7iylocBLGQC2HvA&oe=63995A22",
    },
    {
      id: "2",
      name: "Duy2",
      fullName: "Văn Nguyễn Duy2",
      avatar:
        "https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-1/138317164_1579505722244254_2206959289389356615_n.jpg?stp=dst-jpg_p160x160&_nc_cat=102&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=xDD6M5wYHdAAX_UWGgp&_nc_ht=scontent.fhan2-1.fna&oh=00_AfABEsat-q98f66evyS7FGGSv_4k0QO7iylocBLGQC2HvA&oe=63995A22",
    },
    {
      id: "3",
      name: "Duy3",
      fullName: "Văn Nguyễn Duy3",
      avatar:
        "https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-1/138317164_1579505722244254_2206959289389356615_n.jpg?stp=dst-jpg_p160x160&_nc_cat=102&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=xDD6M5wYHdAAX_UWGgp&_nc_ht=scontent.fhan2-1.fna&oh=00_AfABEsat-q98f66evyS7FGGSv_4k0QO7iylocBLGQC2HvA&oe=63995A22",
    },
    {
      id: "4",
      name: "Duy4",
      fullName: "Văn Nguyễn Duy4",
      avatar:
        "https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-1/138317164_1579505722244254_2206959289389356615_n.jpg?stp=dst-jpg_p160x160&_nc_cat=102&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=xDD6M5wYHdAAX_UWGgp&_nc_ht=scontent.fhan2-1.fna&oh=00_AfABEsat-q98f66evyS7FGGSv_4k0QO7iylocBLGQC2HvA&oe=63995A22",
    },
  ];
  return {
    props: {
      users,
    },
  };
};

export default LoginPage;
