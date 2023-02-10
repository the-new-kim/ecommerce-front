import { Link } from "react-router-dom";

export default function AdminNav() {
  return (
    <div className="p-5 pr-0">
      <ul className="px-2 bg-white border shadow-sm border-slate-300 rounded-md [&>*]:my-2">
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/admin/products">Products</Link>
        </li>
        <li>
          <Link to="/admin/orders">Orders</Link>
        </li>
        <hr />
        <li>
          <Link to="/admin/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
}
