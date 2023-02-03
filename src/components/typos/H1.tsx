import { ReactNode } from "react";

export interface IHeadingProps {
  children: ReactNode;
}

export default function H1({ children }: IHeadingProps) {
  return (
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{children}</h1>
  );
}
