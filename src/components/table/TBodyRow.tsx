import { ReactNode } from "react";

interface ITBodyRowProps {
  children: ReactNode;
}

export default function TBodyRow({ children }: ITBodyRowProps) {
  return <tr className="[&>*]:p-3 border-b-[1px] border-black">{children}</tr>;
}
