import { ReactNode } from "react";

interface ITHeadRowProps {
  children: ReactNode;
}

export default function THeadRow({ children }: ITHeadRowProps) {
  return <tr className="[&>*]:p-3 border-b-[1px] border-black ">{children}</tr>;
}
