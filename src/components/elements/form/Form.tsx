import React, { ReactNode } from "react";

interface IFormProps {
  children: ReactNode;
  [key: string]: any;
}

const Form = React.forwardRef<HTMLFormElement, IFormProps>(
  ({ children, ...rest }, ref) => (
    <form ref={ref} {...rest}>
      {children}
    </form>
  )
);

export default Form;
