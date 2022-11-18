import React, { HTMLAttributes } from "react";

const Logo = (props: HTMLAttributes<HTMLHeadingElement>) => {
  const { className, ...restProps } = props;
  return (
    <h2
      className={`bg-clip-text text-5xl font-bold text-transparent bg-[#1877F2]
       ${className || ""}`}
      {...restProps}
    >
      facebook
    </h2>
  );
};

export default Logo;
