import React, { useState } from "react";
import { ModalRegisterProps } from "../types/Props";
import { RegisterUserLayout } from "./Login";
import { useForm } from "react-hook-form";
import { User } from "../types/User";
import Input from "./Input";
import { EMAIL_PATTERN, ERROR_MESSAGES } from "../utils/constants";

function ModalRegister({ onRegister }: ModalRegisterProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();
  console.log("errors", errors);
  const onSubmitForm = (data: User) => {
    setIsLoading(true);
    fetch("/api/user/register", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const watchAll = watch();
  return (
    <RegisterUserLayout>
      <form onSubmit={handleSubmit(onSubmitForm)}>
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
          className="w-80"
        />
        <Input
          type="password"
          placeholder="Password"
          errorText={
            errors.password?.message ||
            ERROR_MESSAGES[errors.password?.type as "isNotMatchingPassword"]
          }
          registerForm={{
            ...register("password", {
              required: {
                value: true,
                message: "This field is required.",
              },
              validate: {
                isNotMatchingPassword: (data: string | undefined) =>
                  data === watchAll.rePassword,
              },
            }),
          }}
        />
        <Input
          type="password"
          placeholder="Password"
          errorText={
            errors.rePassword?.message ||
            ERROR_MESSAGES[errors.rePassword?.type as "isNotMatchingPassword"]
          }
          registerForm={{
            ...register("rePassword", {
              required: {
                value: true,
                message: "This field is required.",
              },
              validate: {
                isNotMatchingRePassword: (data: string | undefined) =>
                  data === watchAll.password,
              },
            }),
          }}
        />
        <button
          type="submit"
          className="flex text-xl ml-auto mr-auto mt-4 w-fit text-white bg-[#42b72a] hover:bg-[#36a420] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={onRegister}
          disabled={isLoading}
        >
          Sign Up
        </button>
      </form>
    </RegisterUserLayout>
  );
}

export default ModalRegister;
