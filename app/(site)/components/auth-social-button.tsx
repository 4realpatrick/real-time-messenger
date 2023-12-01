import React from "react";
import { IconType } from "react-icons";
interface IAuthSocialButtonProps {
  icon: IconType;
  socialName: string;
  onClick: () => void;
}
const AuthSocialButton: React.FC<IAuthSocialButtonProps> = ({
  icon: Icon,
  socialName,
  onClick,
}) => {
  return <div className="tooltip" data-tip={socialName}>
    <button type="button" onClick={onClick} className="btn-sm">
    <Icon className="w-full h-full text-primary"/>
  </button>
  </div>;
};

export default AuthSocialButton;
