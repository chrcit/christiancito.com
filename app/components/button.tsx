import { ReactNode } from "react";

const Button = ({ children }: { children: ReactNode[] }) => {
  return (
    <>
      <button className="appearance-none bg-blue-700">{children}</button>
    </>
  );
};

export default Button;
