import React from "react";
import shuffle from "lodash.shuffle";
import { IQuestion } from "./questions";

import "./GameScreen.css";

interface IGameScreenProps {
  question: IQuestion | null;
  onAnswer: (answer: string) => any;
  score: number;
  time: number;
}
const GameScreen: React.FunctionComponent<IGameScreenProps> = ({
  question,
  score,
  time,
  onAnswer,
}) => {
  const [answers, setAnswers] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (question) {
      setAnswers(
        shuffle([...question.incorrectAnswers, question.correctAnswer])
      );
    }
    setSelectedAnswer(false);
  }, [question]);

  const [selectedAnswer, setSelectedAnswer] = React.useState<boolean>(
      false
  );
  const handleAnswerSelect = (answer: string) => (e: any) => {
    if(!selectedAnswer){
    setSelectedAnswer(true);
    onAnswer(answer);
    }
  };

    return (
      <div className="GameScreen">
        <div className="meta">
          <div>Category: {question?.category}</div>
          <div>Time: {time}</div>
          <div>Difficulty: {question?.difficulty}</div>
          <div>Score: {score}</div>
        </div>
        <div className="game">
          {question ? <React.Fragment>
            <h1
              className="question"
              dangerouslySetInnerHTML={{ __html: question.question }}
            />
            <div className="answers">
              {answers.map((answer, index) => (
                <div
                  className={`option ${
                    answer === question.correctAnswer ? "correct" : "incorrect"
                  } ${selectedAnswer && "revealed"} `}
                  key={index}
                  onClick={handleAnswerSelect(answer)}
                  dangerouslySetInnerHTML={{__html: answer}}
                />
              ))}
            </div>
          </React.Fragment> : <div>Loading...</div> }
        </div>
      </div>
    );
};

export default GameScreen;
