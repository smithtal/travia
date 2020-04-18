import axios from "axios";

export interface IQuestion {
  category: string;
  difficulty: "easy" | "medium" | "hard",
  question: string, 
  correctAnswer: string,
  incorrectAnswers: string[]
};

export const getQuestion = async () => {
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


