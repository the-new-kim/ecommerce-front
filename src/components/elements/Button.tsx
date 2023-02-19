import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface IButtonProps {
  children: ReactNode;
  link?: (() => any) | string;
  className?: string;
  [key: string]: any;
}

export default function Button({
  children,
  link,
  className = "",
  ...rest
}: IButtonProps) {
  const defaultClassName =
    "bg-black hover:bg-white text-white hover:text-black border-black border-[1px] py-2 px-4 duration-300 transition-colors ";

  return (
    <>
      {typeof link === "string" ? (
        <Link className={defaultClassName + className} to={link}>
          {children}
        </Link>
      ) : (
        <button
          className={defaultClassName + className}
          onClick={link}
          {...rest}
        >
          {children}
        </button>
      )}
    </>
  );
}
