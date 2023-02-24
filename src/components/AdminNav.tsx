import { ChartLine, Gear, Package, Truck, Users } from "phosphor-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface IListProps {
  children: ReactNode;
  href: string;
}

function List({ children, href }: IListProps) {
  return (
    <li>
      <Link to={href} className="flex justify-start items-center [&>*]:mr-3">
        {children}
      </Link>
    </li>
  );
}

export default function AdminNav() {
  return (
    <ul className="[&>*]:my-2">
      <List href="/admin">
        <ChartLine />
        Overview
      </List>
      <hr />
      <List href="/admin/users">
        <Users />
        Users
      </List>
      <List href="/admin/products">
        <Package />
        Products
      </List>
      <List href="/admin/orders">
        <Truck />
        Orders
      </List>
      <hr />
      <List href="/admin/settings">
        <Gear />
        Settings
      </List>
    </ul>
  );
}
