import React from "react";

import "./GameOverScreen.css";
import Button from "./Button";

interface IGameOverScreenProps{
    score: number;
    resetGame: (e: any) => any;
}
const GameOverScreen: React.FunctionComponent<IGameOverScreenProps> = ({ score, resetGame }) =>{
    return (
        <div className="GameOver">
            <h1>Your Score: {score}</h1>
            <Button text="Play Again?" onClick={resetGame}/>
        </div>
    )
}

export default GameOverScreen;