import { useRouter } from "next/router";
import React from "react";
import MainNavigation from "./Navigation";

function Layout(props: any) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      {!["/login", "/_error"].includes(pathname) && <MainNavigation />}
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
