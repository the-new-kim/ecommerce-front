import { ReactNode } from "react";
import Heading from "./elements/typos/Heading";

interface IEmptyProps {
  children: ReactNode;
}

export default function Empty({ children }: IEmptyProps) {
  return (
    <div
      className="w-full h-full flex-grow flex justify-center items-center
    text-xl
    "
    >
      <div className="mb-16">{children}</div>
    </div>
  );
}
