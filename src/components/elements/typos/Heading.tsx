import { ReactNode } from "react";

interface IHeadingComponentProps {
  className?: string;
  children: ReactNode;
}

interface IHeadingProps extends IHeadingComponentProps {
  tagName?: "h1" | "h2" | "h3" | "h4" | "h5";
}

const H1 = ({ className, children }: IHeadingComponentProps) => {
  return (
    <h1 className={"text-2xl sm:text-3xl md:text-4xl lg:text-5xl " + className}>
      {children}
    </h1>
  );
};

const H2 = ({ className, children }: IHeadingComponentProps) => {
  return (
    <h2 className={"text-xl sm:text-2xl md:text-3xl lg:text-4xl " + className}>
      {children}
    </h2>
  );
};

const H3 = ({ className, children }: IHeadingComponentProps) => {
  return (
    <h3 className={"text-lg sm:text-xl md:text-2xl lg:text-3xl " + className}>
      {children}
    </h3>
  );
};

const H4 = ({ className, children }: IHeadingComponentProps) => {
  return (
    <h4 className={"text-base sm:text-lg md:text-xl lg:text-2xl " + className}>
      {children}
    </h4>
  );
};

const H5 = ({ className, children }: IHeadingComponentProps) => {
  return (
    <h5 className={"text-sm sm:text-base md:text-lg lg:text-xl " + className}>
      {children}
    </h5>
  );
};

const getHeadingComponent = ({
  tagName,
  className,
  children,
}: IHeadingProps) => {
  switch (tagName) {
    case "h1":
      return <H1 className={className}>{children}</H1>;
    case "h2":
      return <H2 className={className}>{children}</H2>;
    case "h3":
      return <H3 className={className}>{children}</H3>;
    case "h4":
      return <H4 className={className}>{children}</H4>;
    case "h5":
      return <H5 className={className}>{children}</H5>;
  }
};

export default function Heading({
  tagName = "h1",
  children,
  className = "",
}: IHeadingProps) {
  return <>{getHeadingComponent({ tagName, children, className })}</>;
}
