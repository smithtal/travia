import React from "react";
import shuffle from "lodash.shuffle";
import { IQuestion } from "./questions";

import "./GameScreen.css";

interface IGameScreenProps {
  question: IQuestion | null;
  onAnswer?: (answer: string) => any;
}
const GameScreen: React.FunctionComponent<IGameScreenProps> = ({
  question,
  onAnswer,
}) => {
  const [answers, setAnswers] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (question) {
      setAnswers(
        shuffle([...question.incorrectAnswers, question.correctAnswer])
      );
    }
  }, [question]);

  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(
    null
  );
  const handleAnswerSelect = (answer: string) => (e: any) => {
    setSelectedAnswer(answer);
    // onAnswer(answer);
  };

  if (question) {
    return (
      <div className="GameScreen">
        <div className="meta">
          <div>Category: {question.category}</div>
          <div>Time 300</div>
          <div>Difficulty: {question.difficulty}</div>
          <div>Score: 0</div>
        </div>
        <div className="game">
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
                dangerouslySetInnerHTML={{ __html: answer }}
                onClick={handleAnswerSelect(answer)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <span>Loading...</span>;
  }
};

export default GameScreen;
