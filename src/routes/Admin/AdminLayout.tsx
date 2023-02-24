import { Outlet } from "react-router-dom";
import AdminNav from "../../components/AdminNav";
import Heading from "../../components/elements/typos/Heading";

export default function AdminLayout() {
  return (
    <div className="flex flex-col md:grid md:grid-cols-12 h-full [&>*]:p-5">
      <div className="md:col-span-2 bg-slate-200">
        <Heading tagName="h3" className="mb-2 md:mb-5">
          Dashboard
        </Heading>
        <AdminNav />
      </div>
      <div className="md:col-span-10 md:col-start-3 flex flex-col justify-start items-start">
        <Outlet />
      </div>
    </div>
  );
}
