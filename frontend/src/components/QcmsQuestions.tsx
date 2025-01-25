import { ArrowLeft, ArrowRight } from "lucide-react";
import { useQcmStore } from "../stores/useQcmStore";
import { twMerge } from "tailwind-merge";
import Watch from "./watch";
import CheckboxCard from "./CheckboxCard";
import RadioCard from "./RadioCard";
const QcmsQuestions = () => {
  const {
    QcmsData,
    completed,
    handleNextQuestion,
    handlePreviousQuestion,
    updateScore,
    currentIndex,
  } = useQcmStore();

  return (
    <div className="h-full w-full flex items-center justify-center">
      {QcmsData.map((item: any, index: any) => {
        return (
          currentIndex === index && (
            item?.type === 'radio' ? (
              <RadioCard
              key={index}
              id={item.id}
              question={item.question}
              answers={item.answers}
              type={item.type}
              updateScore={updateScore}
            />
            ) : (
              <CheckboxCard
              key={index}
              id={item.id}
              question={item.question}
              answers={item.answers}
              type={item.type}
              updateScore={updateScore}
            />
            )
          )
        );
      })}
      <div className="flex gap-2 absolute bottom-11 right-10">
        <button
          disabled={completed}
          onClick={handlePreviousQuestion}
          className="size-10 rounded-full bg-gris/25 flex items-center disabled:bg-red-500 disabled:cursor-not-allowed justify-center"
        >
          <ArrowLeft />
        </button>
        <button
          disabled={completed}
          onClick={handleNextQuestion}
          className="size-10 rounded-full bg-gris/25 flex disabled:bg-red-500 disabled:cursor-not-allowed transition-all items-center justify-center"
        >
          <ArrowRight />
        </button>
      </div>
      <div className="flex absolute w-[85%]   lg:w-[95%] gap-2 bottom-4  ">
        {Array.from({ length: QcmsData.length }, (_, index) => (
          <span
            key={index}
            className={twMerge(
              "inline-flex flex-1 h-2  bg-gris/75",
              index <= currentIndex && "bg-[#DD86FF]"
            )}
          ></span>
        ))}
      </div>
      <Watch />
    </div>
  );
};

export default QcmsQuestions;
