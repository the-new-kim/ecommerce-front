import { ReactNode } from "react";

interface IContainerWithRoundedBorderProps {
  children: ReactNode;
  className?: string;
}

export default function ContainerWithRoundedBorder({
  children,
  className = "",
}: IContainerWithRoundedBorderProps) {
  return (
    <div className={"p-3 border border-slate-300 rounded-lg " + className}>
      {children}
    </div>
  );
}
