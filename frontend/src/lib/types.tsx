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
  question: string;
  type: "checkbox" | "radio";
  answers: { answer: string; right: boolean }[];
  updateScore: (point: number) => void;
  display?: boolean
};
