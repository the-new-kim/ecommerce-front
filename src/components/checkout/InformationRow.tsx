import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface IInformationRowProps {
  title: string;
  children: ReactNode;
  linkTo: string;
  linkText: string;
}

export default function InformationRow({
  title,
  children,
  linkTo,
  linkText,
}: IInformationRowProps) {
  return (
    <div>
      <small className="flex justify-start items-center">
        <div className="mr-3 min-w-fit text-gray-700">{title}</div>
        <div>{children}</div>
      </small>
      <Link to={linkTo}>
        <small>{linkText}</small>
      </Link>
    </div>
  );
}
