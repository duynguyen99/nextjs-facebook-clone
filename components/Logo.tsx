import { useRouter } from "next/router";
import React, { HTMLAttributes } from "react";

const Logo = (props: HTMLAttributes<HTMLHeadingElement>) => {
  const { className, ...restProps } = props;
  const router = useRouter();
  console.log('router.query.', router)
  return (
    <h2
      className={`bg-clip-text lg:text-3xl  xs:flex lg:w-fit xs:justify-center items-center font-bold text-transparent bg-[#1877F2]
       ${className || ""} ${router.pathname === '/login' ? 'text-4xl' : 'text-xl'}`}
      {...restProps}
    >
      facebook
    </h2>
  );
};

export default Logo;
