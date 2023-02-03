import { IHeadingProps } from "./H1";

export default function H4({ children }: IHeadingProps) {
  return (
    <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl">{children}</h4>
  );
}
