import React from 'react';
import axios from "axios";
import shuffle from "lodash.shuffle";
import useInterval from "@use-it/interval";

import "./App.css";
import traviaLogo from "./travia-logo.svg";
import Button from './Button';

interface IQuestion {
  category: string;
  difficulty: "easy" | "medium" | "hard",
  question: string, 
  correctAnswer: string,
  incorrectAnswers: string[]
};
const getQuestion = async () => {
  const { data: { results }} = await axios.get("https://opentdb.com/api.php?amount=1&type=multiple");
  const { category, difficulty, question, correct_answer, incorrect_answers } = results[0];
  return {
    category,
    difficulty,
    question,
    correctAnswer: correct_answer,
    incorrectAnswers: incorrect_answers
  } as IQuestion;
};

interface IStartScreenProps {
  onStartGameClick: (e: any) => any;
}
const StartScreen: React.FunctionComponent<IStartScreenProps> = ({ onStartGameClick }) => {
  return (
    <React.Fragment>
      <h1>Travia</h1>
      <button onClick={onStartGameClick}>Start Now</button>
    </React.Fragment>
  )
}

interface IQuestionScreenProps {
  question: IQuestion;
  onAnswer: (answer: string) => any;
}
const QuestionScreen: React.FunctionComponent<IQuestionScreenProps> = ({ question, onAnswer }) => {
  const [answers, setAnswers] = React.useState<string[]>([]);

  React.useEffect(() => {
    setAnswers(shuffle([...question.incorrectAnswers, question.correctAnswer]));
  },[question])

  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);
  const handleAnswerSelect = (answer: string) => (e: any) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
  }
  return (
    <React.Fragment>
      <div>Category: {question.category}</div>
      <div>Difficulty: {question.difficulty}</div>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: question.question}} />
      {answers.map((answer, index) => <div className={`option ${answer === question.correctAnswer ? 'correct' : 'incorrect'} ${selectedAnswer && 'revealed'} `} key={index} dangerouslySetInnerHTML={{__html: answer}} onClick={handleAnswerSelect(answer)}/>)}
    </React.Fragment>
  )
}

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

//   return (
//     time <= 0 ? <GameOverScreen score={score} /> : <React.Fragment>
//       { started && 
//       <React.Fragment>
//         <div>Time: {time}</div>
//         <div>Score: {score}</div>
//         </React.Fragment>
//         }
//       {
//         started || <StartScreen onStartGameClick={loadQuestion} />
//       }
//       {
//         currentQuestion && <QuestionScreen question={currentQuestion} onAnswer={handleAnswer}  />
//       }
//     </React.Fragment>
//   );
// }

const openSourceCode = () => {
  window.location.href = 'https://github.com/smithtal/travia'
}

return (
  <div className="App">
    <img src={traviaLogo} className="logo"/>
    <div className="links">
      <Button text='Start Game' onClick={loadQuestion} />
      <Button text='Source Code' onClick={openSourceCode} />
    </div>
  </div>
)
}

export default App;
