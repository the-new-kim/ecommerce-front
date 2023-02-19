import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

import Footer from "./components/Footer";
import Header from "./components/Header";
import { headerHeightAtom } from "./libs/atoms";

export default function Layout() {
  const headerHeight = useRecoilValue(headerHeightAtom);
  return (
    <div className="relative flex flex-col min-h-screen w-full justify-start items-start [&>*]:w-full font-light">
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
