import React, { useMemo, useState } from "react";
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

  const [errorMsg, setErrorMsg] = useState<string>();

  const onSubmitForm = (data: User) => {
    setErrorMsg('');
    onRegister(data, (msg) => {
      setErrorMsg(msg);
    });
  };

  const watchAll = watch();

  const isFullFill = useMemo(() => {
    const {email, password, rePassword, fullName} = watchAll;
    return email && password && rePassword && fullName;
  }, [watchAll])
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
          className="w-96"
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
          className="w-96 mt-4"
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
              minLength: {
                value: 7,
                message: 'Password must great than 7 character'
              }
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
              minLength: {
                value: 7,
                message: 'Password must great than 7 character'
              }
            }),
          }}
        />
         {errorMsg && <div className="text-red-600 mt-2">{errorMsg}</div>}
        <Button
          title="Sign Up"
          buttonType="secondary"
          className="w-fit mt-4 ml-auto mr-auto text-xl flex"
          disabled={loading || !isFullFill}
          loading={loading}
          type="submit"
        />
      </form>
    </LoginRegisterForm>
  );
}

export default ModalRegister;
