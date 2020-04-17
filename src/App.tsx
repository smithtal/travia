import React from 'react';
import axios from "axios";

interface IQuestion {
  category: string;
  difficulty: string,
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
}
const QuestionScreen: React.FunctionComponent<IQuestionScreenProps> = ({ question }) => {
  return (
    <React.Fragment>
      <span dangerouslySetInnerHTML={{ __html: question.question}} />
    </React.Fragment>
  )
}

const App: React.FunctionComponent<{}> = () => {
  const [started, setStarted] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState<IQuestion | null>(null);
  const loadQuestion = async () => {
    setStarted(true);
    setCurrentQuestion(null);
    setCurrentQuestion(await getQuestion());
  }
  return (
    <React.Fragment>
      {
        started || <StartScreen onStartGameClick={loadQuestion} />
      }
      {
        currentQuestion && <QuestionScreen question={currentQuestion} />
      }
    </React.Fragment>
  );
}

export default App;
