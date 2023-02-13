import { ReactNode } from "react";
import H3 from "./typos/H3";

interface IAdminHeaderProps {
  title: string;
  children?: ReactNode;
}

export default function AdminHeader({ title, children }: IAdminHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full mb-5">
      <H3>{title}</H3>
      {/* <CreateButton href="/admin/products/create" text="Create" /> */}
      {children}
    </div>
  );
}
