import { ReactNode } from "react";

interface IMessageProps {
  children: ReactNode;
}

export default function Message({ children }: IMessageProps) {
  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.5)] text-white z-50 flex justify-center items-center">
      {children}
    </div>
  );
}
