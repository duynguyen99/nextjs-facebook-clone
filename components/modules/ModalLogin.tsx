import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { FormLogin } from "../../types/Base";
import { ModalLoginProps } from "../../types/Props";
import { EMAIL_PATTERN, ERROR_MESSAGES } from "../../utils/constants";
import Button from "../Button";
import Input from "../Input";

function ModalLogin({
  user,
  loading,
  isErrorInCorrectPasswordModal,
  onLogin,
}: ModalLoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>();

  const onSubmitForm = (data: FormLogin) => {
    onLogin(data);
  };

  return (
    <div className="flex flex-col items-center">
      {user && (
        <Image
          src={user?.avatar || ""}
          width={500}
          height={500}
          alt="avatar"
          className="rounded-full w-40 h-40"
        />
      )}
      {user && <div className="mt-2">{user?.fullName}</div>}
      <div className="mt-4 lg:w-96 w-52 flex flex-col items-center">
        {!user && (
          <Input
            type="email"
            placeholder="Email"
            errorText={errors.email?.message}
            className="mb-4 mt-8"
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
        )}
        <Input
          type="password"
          placeholder="Password"
          errorText={
            errors?.password
              ? "Password is required"
              : isErrorInCorrectPasswordModal
              ? ERROR_MESSAGES.incorrectPassword
              : ""
          }
          registerForm={{
            ...register("password", {
              required: true,
            }),
          }}
        />
        <Button
          title={loading ? "Logging In" : "Log in"}
          className="mt-4 h-12 w-full text-lg"
          loading={loading}
          disabled={loading}
          onClick={handleSubmit(onLogin)}
        />
      </div>
    </div>
  );
}

export default ModalLogin;
