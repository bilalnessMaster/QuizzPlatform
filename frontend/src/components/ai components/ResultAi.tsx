import { useAiQcmStore } from "@/stores/useAiQcmStore";
import TilteHeader from "../TilteHeader";
import { Answer, SelectedAnswer } from "@/lib/types";
import { twMerge } from "tailwind-merge";
import { AlignJustify, Check, Dot, Percent, Star, X } from "lucide-react";
import { motion } from "framer-motion";
import Details from "../Details";

const container = {
  hide: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.3,
      delay: 0.2,
    },
  },
};
const item = {
  hide: {
    y: 100,
    opacity: 0,
    filter: "blur(2px)",
  },
  animate: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
};
const ResultAi = () => {
  const { SelectedAnswers, QcmsData , score , ResetQcmDetails  } = useAiQcmStore();
  const handleClose = () =>  {
    ResetQcmDetails()
  }
  
  return (

      <motion.section
        initial={{
          translateY: "100%",
        }}
        animate={{
          translateY: "0%",
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
          type : 'tween'
        }}
        style={{
          translateX: "-50%",
        }}
        className="customBg absolute z-10  px-4 space-y-2 py-2  w-[98%] bottom-0 left-1/2  rounded-b-none rounded-t-3xl overflow-auto  "
      >
        <section className="w-ful  ">
          <div className="flex ">
            <TilteHeader title="status" className="font-bricolage" />{" "}
            <span onClick={handleClose}>
              <X />
            </span>
          </div>
          <div className="space-y-3">
            <div className="w-96 flex gap-1 items-center bg-gris/25 h-10 rounded">
              <div className={twMerge('h-10 bg-[#FF718B] rounded-md flex-1 ',)}>
                <span className="sr-only">for right answers</span>
              </div>
              <motion.div 
              animate={{
                width: `${(score/QcmsData.length)*384}px` 
              }}
              className={twMerge('h-10 bg-[#7FE47E] rounded-md' )}>
                <span className="sr-only">for false answers</span>
              </motion.div>
            </div>
            <div className="flex gap-5">
            <Details
                name="Wrong"
                icon={<X size={20} color="red" />}
                number={QcmsData.length - score}
              />
              <Details
                name="Right"
                icon={<Check size={20} color="green" />}
                number={score}
              />
              
              <Details
                name="Question"
                icon={<AlignJustify size={20} color="#DD86FF" />}
                number={QcmsData.length}
              />
              <Details
                name="Score"
                icon={<Star size={20} color="yellow" />}
                number={score}
              />
              <Details
                name="Accuracy"
                icon={<Percent size={20} color="brown" />}
                number={(score/QcmsData.length)*100}
              />
            </div>
          </div>
        </section>
        <section>
          <TilteHeader title="Selected Answers" className="font-bricolage" />
          <motion.div
            variants={container}
            initial="hide"
            animate="animate"
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2"
          >
            {SelectedAnswers.map((answer: SelectedAnswer, index: number) => (
              <motion.div
                variants={item}
               
                key={index}
                className={twMerge(
                  "border border-red-300 bg-red-50 px-2 py-2 rounded-md",
                  answer?.answers[0]?.right && "border-green-300 bg-green-50"
                )}
              >
                <TilteHeader title={answer?.question} className="text-lg" />
                <div className="flex  gap-1">
                  {/* <TilteHeader title='right answers'  /> */}
                  <h1 className="text-sm font-medium capitalize whitespace-nowrap">
                    right answers
                  </h1>
                  <div className="">
                    {answer?.rightAnswers?.map(
                      (right: (typeof answer.rightAnswers)[number]) => (
                        <TilteHeader
                          icon={<Dot />}
                          title={right.answer}
                          className="text-sm capitalize w-fit font-light"
                        />
                      )
                    )}
                  </div>
                </div>
                <div className="flex  gap-1">
                  {/* <TilteHeader title='right answers'  /> */}
                  <h1 className="text-sm font-medium capitalize whitespace-nowrap">
                    Your answers
                  </h1>
                  <div className="">
                    {answer?.answers?.map((right: Answer) => (
                      <TilteHeader
                        icon={<Dot />}
                        title={right.answer}
                        className="text-sm capitalize w-fit font-light"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </motion.section>
      

  );
};
// <section className="absolute inset-0 bg-black/5 backdrop-blur-sm "></section> 
export default ResultAi;
