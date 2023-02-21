import { Link } from "react-router-dom";

export default function AdminNav() {
  return (
    <ul className="[&>*]:my-2">
      <li>
        <Link to="/admin">Overview</Link>
      </li>
      <hr />
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
  );
}
