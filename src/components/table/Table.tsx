import { ReactNode } from "react";

interface ITableProps {
  children: ReactNode;
}

export default function Table({ children }: ITableProps) {
  return <table className="text-start mt-5 w-full">{children}</table>;
}
