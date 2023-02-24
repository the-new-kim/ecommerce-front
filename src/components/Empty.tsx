import { ReactNode } from "react";

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
      <div className="py-[10vh]">{children}</div>
    </div>
  );
}
