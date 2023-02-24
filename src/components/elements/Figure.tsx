import { ReactNode } from "react";

interface IFigureProps {
  children: ReactNode;
}

export default function Figure({ children }: IFigureProps) {
  return (
    <figure className="w-full overflow-x-scroll border-[1px] border-black">
      {children}
    </figure>
  );
}
