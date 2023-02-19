import { WarningCircle } from "phosphor-react";
import { ReactNode } from "react";

interface IErrorMessageProps {
  children: ReactNode;
}

export default function ErrorMessage({ children }: IErrorMessageProps) {
  return (
    <small className="text-red-300 font-medium flex justify-start items-center">
      <WarningCircle weight="bold" /> {children}
    </small>
  );
}
