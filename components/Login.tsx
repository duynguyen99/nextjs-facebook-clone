import React from "react";
import { LayoutProps } from "../types/Props";

const LoginLayout = (props: LayoutProps) => {
  return (
    <div className="flex bg-slate-200 h-screen sm:flex-col">
      {props.children}
    </div>
  );
};

export const RecentLoginWrap = (props: LayoutProps) => {
  return (
    <div className="flex w-2/3 h-2/3 m-auto flex-col md:flex-row p-8">
      {props.children}
    </div>
  );
};

export const RecentLogin = (props: LayoutProps) => {
  return (
    <div className="flex flex-col w-2/4 pr-32 md:w-full">{props.children}</div>
  );
};

export const RecentUserLayout = (props: LayoutProps) => {
  return <div className="flex flex-wrap">{props.children}</div>;
};

export const LoginFormLayout = (props: LayoutProps) => {
  return (
    <div className="w-2/4 p-4 bg-white rounded-md h-fit mt-16 shadow-lg">
      {props.children}
    </div>
  );
};

export const RegisterUserLayout = (props: LayoutProps) => {
  return <div className="">{props.children}</div>;
};

export default LoginLayout;
