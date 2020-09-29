export type RootStackParamList = {
  HomeScreen: undefined;
  SelectionScreen: undefined;
  QuizScreen: undefined;
  ResultScreen: undefined;
  LeaderBoardScreen: undefined;
};

export interface QuestionProps {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: boolean;
}

export interface ScoreDataProps {
  difficulty: string;
  score: number;
  uid: string;
  username: string;
}
