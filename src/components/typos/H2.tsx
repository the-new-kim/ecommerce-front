import { IHeadingProps } from "./H1";

export default function H2({ children }: IHeadingProps) {
  return (
    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">{children}</h2>
  );
}
