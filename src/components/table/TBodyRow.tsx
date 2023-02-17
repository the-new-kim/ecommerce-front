import { ReactNode } from "react";

interface ITBodyRowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => any;
}

export default function TBodyRow({
  children,
  className = "",
  onClick,
}: ITBodyRowProps) {
  return (
    <tr
      className={"[&>*]:p-3 border-b-[1px] border-black " + className}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}
