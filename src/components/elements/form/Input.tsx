import React, { HTMLInputTypeAttribute } from "react";
import { cls } from "../../../libs/utils";

interface IInputProps {
  [key: string]: any;
  type?: HTMLInputTypeAttribute;
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ type, hasError = false, ...rest }, ref) =>
    type === "submit" ? (
      <input
        className="bg-black hover:bg-white text-white hover:text-black border-black border-[1px] py-2 px-4 duration-300 transition-colors cursor-pointer mt-5 rounded-none"
        type={type}
        {...rest}
      />
    ) : (
      <input
        type={type}
        {...rest}
        ref={ref}
        className={`
    ${cls(
      hasError
        ? "border-red-500 focus:border-red-500"
        : "border-black focus:border-sky-400"
    )}
    mt-1 px-3 py-2 bg-white border placeholder-slate-400 focus:outline-none w-full sm:text-sm rounded-none`}
      />
    )
);

export default Input;
