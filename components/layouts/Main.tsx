import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { LayoutProps, ToggleType } from "../../types/Props";
import { BLACK_LIST_NAV_BAR } from "../../utils/constants";
import MainNavigation from "./Navigation";
export const RequestContext = React.createContext<{
  requestType?: ToggleType;
  setRequestType?: (type: ToggleType) => void;
}>({});
function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { pathname } = router;
  const isShowNavigationBar = !BLACK_LIST_NAV_BAR.includes(pathname);
  const [requestType, setRequestType] = useState<ToggleType | null>(
    null
  );

  const setRequestTypeData = (type: ToggleType) => {
    console.log("type", type);
    localStorage.setItem("requestType", JSON.stringify(type));
    setRequestType(type);
  };

  useEffect(() => {
    console.log('window', window)
    if (typeof window !== "undefined") {
      const previousRequestType =
        (window.localStorage.getItem("requestType") as unknown as ToggleType) ||
        ToggleType.RESTFUL;
        console.log('previousRequestType', previousRequestType)
      setRequestType(previousRequestType);
    }
  }, []);
  return (
    <>
      <RequestContext.Provider
        value={{ requestType, setRequestType: setRequestTypeData }}
      >
        {isShowNavigationBar && <MainNavigation />}
        <main>
          <div className={isShowNavigationBar ? "mt-16" : ""}>{children}</div>
        </main>
      </RequestContext.Provider>
    </>
  );
}

export default Layout;
