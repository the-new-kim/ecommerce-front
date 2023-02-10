import { ReactNode } from "react";

interface ITHeadProps {
  children: ReactNode;
}

export default function THead({ children }: ITHeadProps) {
  return (
    <thead className="[&>*]:p-3 border-b-2 border-black">{children}</thead>
  );
}
