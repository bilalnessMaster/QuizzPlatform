import { useState } from "react";
import { QuestionProps } from "../lib/types";

const Qcm = ({ question, type, answers, updateScore }: QuestionProps) => {
  const [seletedAnswer, setSeletedAnswer] = useState<string[] | string>([]);
  const handleAnswer = (
    e: React.ChangeEvent<HTMLInputElement>,
    ans: { answer: string; right: boolean }
  ) => {
    const isRight = ans.right;
    let { value, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        setSeletedAnswer((presState) => [...presState, value]);
        if (isRight) {
          updateScore(+1);
        }
      } else {
        // let filter =  seletedAnswer.filter((answer: any) => answer !== value);
        // setSeletedAnswer(filter);
        // if (isRight) {
        //   updateScore(-1);
        // }
      }
    } else {
      if (checked) {
        setSeletedAnswer(value);
        if (isRight) updateScore(+1);
        else updateScore(-1);
      }
    }
  };
  return <div>Qcm</div>;
};

export default Qcm;
