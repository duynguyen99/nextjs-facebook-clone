import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ModalRegisterProps } from "../../types/Props";
import { User } from "../../types/Base";
import { EMAIL_PATTERN, ERROR_MESSAGES } from "../../utils/constants";
import Input from "../Input";
import { LoginRegisterForm } from "../layouts/Login";
import Button from "../Button";

function ModalRegister({ onRegister, loading }: ModalRegisterProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  const onSubmitForm = (data: User) => {
    onRegister(data);
  };

  const watchAll = watch();
  return (
    <LoginRegisterForm>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Input
          type="text"
          placeholder="Full Name"
          errorText={errors.email?.message}
          registerForm={{
            ...register("fullName", {
              required: {
                value: true,
                message: "This field is required.",
              },
            }),
          }}
          className="w-80"
        />
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
          className="w-80 mt-4"
        />
        <Input
          type="password"
          placeholder="Password"
          errorText={
            errors.password?.message ||
            ERROR_MESSAGES[errors.password?.type as "isNotMatchingPassword"]
          }
          className="mt-4"
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
          placeholder="Confirm Password"
          errorText={
            errors.rePassword?.message ||
            ERROR_MESSAGES[errors.rePassword?.type as "isNotMatchingPassword"]
          }
          className="mt-4"
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
        <Button
          title="Sign Up"
          className="w-fit mt-4 ml-auto mr-auto text-xl flex bg-[#42b72a] hover:bg-[#36a420]"
          disabled={loading}
          loading={loading}
          type="submit"
        />
      </form>
    </LoginRegisterForm>
  );
}

export default ModalRegister;
