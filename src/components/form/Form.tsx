import { ReactNode } from "react";

interface IFormProps {
  children: ReactNode;
  onSubmit: () => any;
  className?: string;
}

export default function Form({
  children,
  onSubmit,
  className = "",
}: IFormProps) {
  return (
    <form onSubmit={onSubmit} className={"bg-white p-5 pb-8 " + className}>
      {children}
    </form>
  );
}
