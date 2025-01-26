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