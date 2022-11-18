import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { ModalLoginProps } from "../../types/Props";
import Button from "../Button";
import Input from "../Input";

function ModalLogin({ user, loading, onLogin }: ModalLoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{password: string}>();

  return (
    <div className="flex flex-col items-center">
      <Image
        src={user.avatar || ""}
        width={500}
        height={500}
        alt="avatar"
        className="rounded-full w-40 h-40"
      />
      <div className="mt-2">{user.fullName}</div>
      <div className="mt-4 w-96 flex flex-col items-center">
      <Input
          type="password"
          placeholder="Password"
          errorText={errors?.password ? "Password is required" : ''}
          registerForm={{
            ...register("password", {
              required: true,
            }),
          }}
        />
        <Button
          title={loading ? 'Logging In' : 'Log in'}
          className="mt-4 h-12 w-full text-lg"
          loading={loading}
          disabled={loading}
          onClick={handleSubmit((data) => onLogin(data.password))}
        />
      </div>
    </div>
  );
}

export default ModalLogin;
