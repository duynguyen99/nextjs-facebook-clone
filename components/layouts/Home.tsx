import { LayoutProps } from "../../types/Props";

export const HomeLayout = (props: LayoutProps) => {
  return <div className="bg-slate-200 min-h-screen p-4">{props.children}</div>;
};

export const HomePost = (props: LayoutProps) => {
    return <div className="w-full md:w-2/4 lg:w-2/4 xl:w-2/5 m-auto h-auto">{props.children}</div>;
  };
