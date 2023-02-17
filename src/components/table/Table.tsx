import { ReactNode } from "react";

interface ITableProps {
  children: ReactNode;
  className?: string;
}

export default function Table({ children, className = "" }: ITableProps) {
  return <table className={"text-start w-full " + className}>{children}</table>;
}
