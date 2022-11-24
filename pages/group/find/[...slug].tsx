import React from "react";
import { useRouter } from "next/router";

const FindPage = () => {
  const router = useRouter();
  console.log("router.query", router.query);
  return <div></div>;
};

export default FindPage;
