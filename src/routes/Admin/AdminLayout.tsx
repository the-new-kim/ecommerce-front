import { Outlet } from "react-router-dom";
import AdminNav from "../../components/AdminNav";

export default function AdminLayout() {
  return (
    <div className="grid grid-cols-12 h-full [&>*]:p-5">
      <div className="col-span-2 bg-slate-200">
        <AdminNav />
      </div>
      <div className="col-span-10 col-start-3 flex flex-col justify-start items-start">
        <Outlet />
      </div>
    </div>
  );
}
