import { useState } from "react";
import { QuestionProps } from "../lib/types";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
const CheckboxCard = ({
  question,
  type,
  answers,
  updateScore,
}: QuestionProps) => {
  const [seletedAnswer, setSeletedAnswer] = useState<string[]>([]);
  const handleAnswer = (
    e: React.ChangeEvent<HTMLInputElement>,
    ans: { answer: string; right: boolean }
  ) => {
    const isRight = ans.right;
    let { value, checked } = e.target;

    if (checked) {
      setSeletedAnswer((presState) => [...presState, value.toLowerCase()]);
      if (isRight) {
        updateScore(+1);
      }
    } else {
      let filter = seletedAnswer.filter(
        (answer: any) => answer.toLowerCase() !== value.toLowerCase()
      );
      setSeletedAnswer(filter);
      if (isRight) {
        updateScore(-1);
      }
    }
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 200,
      }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.4,
          ease: [, 0.8, 0.99, 0.45],
          type: "spring",
        },
      }}
      exit={{
        opacity: 0,
        y: -200,
      }}
      className="w-full max-w-lg bg-white shader px-4 py-4 rounded-md space-y-5"
    >
      <div>
        <h1 className="font-dm  font-medium text-xl">{question}</h1>
      </div>
      <div>
        <ul className="space-y-2">
          {answers.map(({ answer, right }, index) => (
            <li key={index} className="flex gap-3 items-center ">
              <input
                onChange={(e) => handleAnswer(e, { answer, right })}
                type={type}
                name={question}
                value={answer}
                id={question + index}
                className={twMerge("checkbox")}
              />
              <span className=" font-dm font-normal text-lg">
                {answer}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default CheckboxCard;

// const selectedAnswer = [
// {
//  question : the capital of french ,
//  answer : ['selected answers']
// }
//]
