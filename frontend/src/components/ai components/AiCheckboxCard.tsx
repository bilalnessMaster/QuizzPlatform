import { useState } from "react";

import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

import { Answer, QuestionProps } from "@/lib/types";
import { useAiQcmStore } from "@/stores/useAiQcmStore";

const AiCheckboxCard = ({
  question,
  type,
  answers,
  updateScore,
}: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);
  const rightQuestions = answers?.filter(item=>item.right)?.length
  const ScorePerAnswer =  rightQuestions ? 1 / rightQuestions : 0;
  const {toast}= useToast()
  const {SetSelectedAnswerCheckBox} = useAiQcmStore()
  const handleAnswer = (
    e: React.ChangeEvent<HTMLInputElement>,
    ans: Answer
  ) => {
    const isRight = ans.right;
    const  { value, checked } = e.target;

    if (checked) {
      SetSelectedAnswerCheckBox(question , {answer : value , right : isRight})
      setSelectedAnswer((presState) => [...presState, value.toLowerCase()]);
      if (isRight) {
        updateScore(+ScorePerAnswer);
      }
      } else {
        SetSelectedAnswerCheckBox(question , {answer : value , right : isRight})
      const filter = selectedAnswer.filter(
        (answer: any) => answer.toLowerCase() !== value.toLowerCase()
      );
      setSelectedAnswer(filter);
      if (isRight) {
        updateScore(-ScorePerAnswer);
      }
    }
  };
  const handleDisable = () => { 
    toast({
      type: "foreground",
      variant : 'destructive',
      title: `You can only choose ${rightQuestions} answers.`,

    })
  }
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
      className="w-full max-w-lg bg-white shader px-4 py-4 rounded-lg space-y-5 dark:bg-neutral-800 dark:border border-neutral-700 "
    >
      <div>
        <h1 className="font-dm  font-medium text-xl">{question}</h1>
      </div>
      <div>
        <ul className="space-y-2">
          {answers.map(({ answer, right }, index) => {
            const isDisabled = selectedAnswer.length === rightQuestions && !selectedAnswer.includes(answer.toLowerCase())
            return (
              <li key={index}  className={`flex gap-3 items-center cursor-pointer ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}  onClick={()=>{
                if(isDisabled){
                  handleDisable()
                }
              }} >
              <input
                onChange={(e) => {handleAnswer(e, { answer, right })}}
                type={type}
                name={question}
                value={answer}
                disabled={isDisabled}
                id={question + index}
                className={twMerge("checkbox", isDisabled ? "pointer-events-none" : "")}
                aria-label={`Answer ${index + 1}`}
              />
              <span className=" font-dm font-normal text-lg">
                {answer}
              </span>
            </li>
            )
          })}
        </ul>
      </div>
    </motion.div>
  );
};

export default AiCheckboxCard;

// const selectedAnswer = [
// {
//  question : the capital of french ,
//  answer : ['selected answers']
// }
//]
