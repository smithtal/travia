import React from "react";
import "./Button.css";

interface IButtonProps {
    text: string;
    onClick: (e: any) => any;
}
const Button: React.FunctionComponent<IButtonProps> = ({ text, onClick}) => {
    return (
        <div className="Button" onClick={onClick}>{text}</div>
    )
}

export default Button;
