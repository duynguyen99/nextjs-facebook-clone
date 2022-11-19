import React from "react";
import { LayoutProps } from "../../types/Props";

const LoginLayout = (props: LayoutProps) => {
  return (
    <div className="flex bg-slate-200 lg:h-screen h-fit sm:flex-col">
      {props.children}
    </div>
  );
};

export const LoginRecentWrap = (props: LayoutProps) => {
  return (
    <div className="flex w-full h-full sm:h-fit md:h-fit xl:w-2/3 lg:h-2/3 m-auto flex-col md:flex-row p-4 lg:p-8">
      {props.children}
    </div>
  );
};

export const LoginRecentForm = (props: LayoutProps) => {
  return (
    <div className="flex flex-col lg:w-2/4 xxl:pr-32 md:w-full">{props.children}</div>
  );
};

export const LoginRecentUser = (props: LayoutProps) => {
  return <div className="flex flex-wrap lg:m-0 m-auto md:m-0">{props.children}</div>;
};

export const LoginForm = (props: LayoutProps) => {
  return (
    <div className="lg:w-1/3 w-full p-4 bg-white rounded-md h-fit mt-16 shadow-lg max-w-[400px] m-auto">
      {props.children}
    </div>
  );
};

export const LoginRegisterForm = (props: LayoutProps) => {
  return <div className="">{props.children}</div>;
};

export default LoginLayout;
