import React from 'react';
import useInterval from "@use-it/interval";
import StartScreen from './StartScreen';
import { IQuestion, getQuestion } from './questions';

import "./App.css";
import GameScreen from './GameScreen';

interface IGameOverScreeProps {
  score: number;
}
const GameOverScreen: React.FunctionComponent<IGameOverScreeProps> = ({ score }) => {
  return (
  <h1>Your Score is: {score}</h1>
  )
}
const App: React.FunctionComponent<{}> = () => {
  const [started, setStarted] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState<IQuestion | null>(null);
  const [score, setScore] = React.useState(0);
  const [time, setTime] = React.useState(300);

  useInterval(() => {
    if(time > 0){
      setTime(time - 1);
    }
  }, 1000)

  const loadQuestion = async () => {
    setStarted(true);
    setCurrentQuestion(null);
    setCurrentQuestion(await getQuestion());
  }
  const handleAnswer = (answer: string) => {
    const scoreValues =  {
      easy: 1,
      medium: 2,
      hard: 3
    };
    if(answer === currentQuestion?.correctAnswer){
      setScore(score + scoreValues[currentQuestion.difficulty]);
    }
    setTimeout(() => {
      loadQuestion();
    }, 1000);
  }


return (
  <div className="App">
    {started || <StartScreen loadQuestion={loadQuestion}/>}
    { started && time > 0 && <GameScreen question={currentQuestion} score={score} time={time} onAnswer={handleAnswer} />}
  </div>
)
}

export default App;
