import React from "react";
import Button from "./Button"

import "./StartScreen.css";
import traviaLogo from "./travia-logo.svg";

interface IStartScreen {
    loadQuestion: (e: any) => any;
}
const StartScreen: React.FunctionComponent<IStartScreen> = ({ loadQuestion }) => {
const openSourceCode = () => {
  window.location.href = 'https://github.com/smithtal/travia'
}
    return (
    <div className="StartScreen">
    <img src={traviaLogo} className="logo"/>
    <div className="links">
      <Button text='Start Game' onClick={loadQuestion} />
      <Button text='Source Code' onClick={openSourceCode} />
    </div>
</div>
    );
}

export default StartScreen;