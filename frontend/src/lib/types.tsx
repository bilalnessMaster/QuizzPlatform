export type formQcmProps = {
  category: string[];
  language: string;
  numberQcms: number;
  level: string;
};

export type qcmProps = {
  setFormQcms: any;
  formQcms : formQcmProps;
};
export type QuestionProps = {
  id:string, 
  question: string;
  type: "checkbox" | "radio";
  answers: Answer[];
  updateScore : (point: number) => void;
  display?: boolean
};

export interface Answer {
  answer: string;
  right: boolean;
  _id?: string;
}

export  interface formProps{ 
    firstName?: string,
    lastName?: string,
    email: string,
    password: string,
}

export type userProps = {
    _id: string,
    firstName: string,
    lastName:string,
    email:string ,
    isAdmin: boolean,
    createdAt: string,
    updatedAt: string,
    gender: string,
    streak : number
} | undefined
export type ResultCardProps = {
  category: string[];
  createdAt: string;
  language: string;
  maxScore: number;
  score: number;
  status: string;
  timeTaken: number;
  updatedAt: string;
  userId: string;
  _id: string;
};


export interface SelectedAnswer {
  category: string;
  question: string;
  answers: Answer[];
  _id: string;
}

export interface QuizResult {
  _id: string;
  score: number;
  language: string;
  category: string[];
  status: string;
  maxScore: number;
  selectedAnswers: SelectedAnswer[];
  timeTaken: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuizResultProps {
  result: QuizResult;
}
