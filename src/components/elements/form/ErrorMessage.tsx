import { WarningCircle } from "phosphor-react";
import { ReactNode } from "react";

interface IErrorMessageProps {
  children: ReactNode;
}

export default function ErrorMessage({ children }: IErrorMessageProps) {
  return (
    <small className="text-red-500 font-medium flex justify-start items-center">
      <WarningCircle weight="bold" className="mr-1" />
      <span>{children}</span>
    </small>
  );
}
