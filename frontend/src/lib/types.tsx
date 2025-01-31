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
    gender: 'male' | 'female',
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