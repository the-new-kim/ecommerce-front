import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRecoilValue } from "recoil";

import Footer from "./components/Footer";
import Header from "./components/Header";

import { headerHeightAtom } from "./libs/atoms";

export default function Layout() {
  const location = useLocation();
  const headerHeight = useRecoilValue(headerHeightAtom);

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative flex flex-col min-h-screen w-full justify-start items-start [&>*]:w-full font-light">
      <ToastContainer />
      <Header />

      <main
        style={{ paddingTop: headerHeight }}
        className="relative flex-grow h-full flex flex-col w-full [&>*]:flex-grow"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
