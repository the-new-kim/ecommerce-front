import { IHeadingProps } from "./H1";

export default function H3({ children }: IHeadingProps) {
  return (
    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl">{children}</h3>
  );
}
