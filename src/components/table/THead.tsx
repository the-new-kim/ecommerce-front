import { ReactNode } from "react";

interface ITHeadProps {
  children: ReactNode;
  [key: string]: any;
}

export default function THead({ children, ...rest }: ITHeadProps) {
  return <thead {...rest}>{children}</thead>;
}
