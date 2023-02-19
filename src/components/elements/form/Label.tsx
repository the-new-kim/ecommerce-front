import { ReactNode } from "react";

interface ILabelProps {
  children: ReactNode;
  [key: string]: any;
}

export default function Label({ children, ...rest }: ILabelProps) {
  return (
    <label className="mb-2 flex flex-col" {...rest}>
      {children}
    </label>
  );
}
