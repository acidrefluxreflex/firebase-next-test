import { Button } from "@mui/material";
import { google_login, logout } from "../framework/firebase/auth";

type BaseButtonProps = {
  text: string;
  onclick(): void;
};
const BaseButton: React.FC<BaseButtonProps> = (props) => (
  <Button onClick={props.onclick}>{props.text}</Button>
);

const LoginButton = () => (
  <BaseButton onclick={() => google_login()} text="LOGIN" />
);

const LogoutButton = () => (
  <BaseButton onclick={() => logout()} text="LOGOUT" />
);

export { BaseButton, LoginButton, LogoutButton };
