import { useRouter } from "next/router";
import React from "react";
import { LayoutProps } from "../../types/Props";
import { BLACK_LIST_NAV_BAR } from "../../utils/constants";
import MainNavigation from "./Navigation";

function Layout({children}: LayoutProps) {
  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      {!BLACK_LIST_NAV_BAR.includes(pathname) && <MainNavigation />}
      <main>
      <div className="mt-16">{children}</div>
      </main>
    </>
  );
}

export default Layout;
