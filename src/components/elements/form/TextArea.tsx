import React from "react";
import { cls } from "../../../libs/utils";

interface IInputProps {
  [key: string]: any;
  hasError?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, IInputProps>(
  ({ hasError = false, ...rest }, ref) => (
    <textarea
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

export default TextArea;
