import { useAiQcmStore } from "@/stores/useAiQcmStore";
import TilteHeader from "../TilteHeader";
import { Answer, SelectedAnswer } from "@/lib/types";
import { twMerge } from "tailwind-merge";
import { Dot, X } from "lucide-react";
import {motion} from 'framer-motion'

const ResultAi = () => {
    const {SelectedAnswers}= useAiQcmStore()
    console.log(SelectedAnswers);
    
  return (
    <section className="overflow-hidden">
      <motion.section
      initial={{
        y: '100%'
      }}
      animate={{
        y: '0%'
      }}
      transition={{
        duration: 0.4,
        ease: [, 0.8, 0.99, 0.45],
        type: "spring",
      }}
      className="absolute z-10 customBg px-4 space-y-2 py-2  inset-x-0 bottom-0 w-full rounded-b-none rounded-t-3xl">
        <section className="w-ful  h-44">
        <div className="flex "><TilteHeader title="status" className="font-bricolage" /> <span><X /></span></div>
        </section>
        <section >
        <TilteHeader title="Selected Answers" className="font-bricolage" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
            {
            SelectedAnswers.map((answer: SelectedAnswer , index: number)=>(
                <div key={index} className={twMerge('border border-red-300 bg-red-50 px-2 py-2 rounded-md',answer?.answers[0].right && 'border-green-300 bg-green-50' )}>
        
                    <TilteHeader title={answer?.question} className="text-lg" />
                    <div className="flex  gap-1">
                    {/* <TilteHeader title='right answers'  /> */}
                     <h1 className="text-sm font-medium capitalize whitespace-nowrap">right answers</h1>
                      <div className="">
                        {
                          answer?.rightAnswers?.map((right : typeof answer.rightAnswers[number])=>(
                            <TilteHeader icon={<Dot />} title={right.answer} className="text-sm capitalize w-fit font-light" />
                          ))  
                        }
                      </div>
                    </div>
                    <div className="flex  gap-1">
                    {/* <TilteHeader title='right answers'  /> */}
                     <h1 className="text-sm font-medium capitalize whitespace-nowrap">Your answers</h1>
                      <div className="">
                        {
      
                          
                          answer?.answers?.map((right : Answer)=>(
                            <TilteHeader icon={<Dot  />} title={right.answer} className="text-sm capitalize w-fit font-light" />
                          ))  
                        }
                      </div>
                    </div>
                </div>
            ))
            }
            </div>
        </section>
      </motion.section>
      <section className="absolute inset-0 bg-black/5 backdrop-blur-sm "></section>
    </section>
  );
};

export default ResultAi;
