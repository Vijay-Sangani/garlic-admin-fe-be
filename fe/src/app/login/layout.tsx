import { JSX } from "react";

const LoginLayout = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <div className="login-page">{children}</div>
);

export default LoginLayout;
