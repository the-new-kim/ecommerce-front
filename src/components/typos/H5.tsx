import { IHeadingProps } from "./H1";

export default function H5({ children }: IHeadingProps) {
  return (
    <h5 className="text-sm sm:text-base md:text-lg lg:text-xl">{children}</h5>
  );
}
