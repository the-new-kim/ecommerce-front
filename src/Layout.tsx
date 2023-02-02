import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen w-full justify-start items-start [&>*]:w-full [&>*]:p-5">
      <Header />

      <main className="flex-grow-[1] bg-slate-100">
        <Suspense>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
