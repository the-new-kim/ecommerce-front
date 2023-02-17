import { ReactNode } from "react";

interface ITHeadProps {
  children: ReactNode;
}

export default function THead({ children }: ITHeadProps) {
  return <thead>{children}</thead>;
}
