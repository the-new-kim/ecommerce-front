import { Outlet } from "react-router-dom";
import AdminNav from "../../components/AdminNav";

export default function AdminLayout() {
  return (
    <div className="grid grid-cols-12 h-full gap-2">
      <div className="col-span-2">
        <AdminNav />
      </div>
      <div className="col-span-10 col-start-3 flex flex-col p-5 justify-start items-start">
        <Outlet />
      </div>
    </div>
  );
}
