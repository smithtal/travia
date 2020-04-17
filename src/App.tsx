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
  const { data: { category, difficulty, question, correct_answer, incorrect_answers }} = await axios.get("https://opentdb.com/api.php?amount=1&type=multiple");
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
  onAnswerSelect: (e: any) => any;
}
const QuestionScreen: React.FunctionComponent<IQuestionScreenProps> = ({ question }) => {
  return (
    <React.Fragment>
      <span dangerouslySetInnerHTML={{ __html: question.question}} />
    </React.Fragment>
  )
}

const App: React.FunctionComponent<{}> = () => {
  return (
    <React.Fragment>
      <StartScreen onStartGameClick={() => console.log('clicked')}/>
    </React.Fragment>
  );
}

export default App;
