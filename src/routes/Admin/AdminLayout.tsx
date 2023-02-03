import { Outlet } from "react-router-dom";
import AdminNav from "../../components/AdminNav";
import ProductForm from "../../components/forms/ProductForm";

export default function AdminLayout() {
  return (
    <div className="grid grid-cols-12 h-full gap-2">
      <div className="col-span-2">
        <AdminNav />
      </div>
      <div className="col-span-10 col-start-3">
        <Outlet />
      </div>
    </div>
  );
}
