import { ReactNode } from "react";

import Heading from "./elements/typos/Heading";

interface IAdminHeaderProps {
  title: string;
  children?: ReactNode;
}

export default function AdminHeader({ title, children }: IAdminHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full mb-5">
      <Heading tagName="h3">{title}</Heading>
      {/* <CreateButton href="/admin/products/create" text="Create" /> */}
      {children}
    </div>
  );
}
