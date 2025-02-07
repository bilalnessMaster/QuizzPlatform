import { leaderboardProps } from "@/lib/types";
import { twMerge } from "tailwind-merge";
import {motion} from 'framer-motion'
import { ChevronDown, ChevronUp, TrendingDown, TrendingUp } from "lucide-react";
import CountUp from "react-countup";
const LeaderBoardCard = ({
  userId,
  rank,
  accuracyPercentage,
  totalPassedQuizzes,
  attempts,
  totalTimeSpent,
  index,
  position
  
}: leaderboardProps & {index : number}) => {
   
    
  return (
    <tr className={twMerge("font-bricolage tabular-nums font-bold h-20 text-sm text-neutral-600 dark:text-neutral-400 border-b dark:border-b dark:border-neutral-700 border-neutral-100 ", index%2 === 0 && 'bg-gris/5' )}>
    <td className="w-32 pl-3 font-bricolage text-xl ">{Number(position) === 1 ? <img src="/crown.png" className="h-5" alt="" /> : <span>{position}</span>}</td>
      <td className=" pl-3 gap-2 items-center h-full py-1">
        <span className="flex gap-2 items-center  ">
        <span className="inline-flex   size-12 bg-gris/25 rounded-full overflow-hidden">
          <img src={`/gender/${userId?.gender}.png`} className="object-cover  w-full" alt="" />
        </span>
        <span className="first-letter:capitalize">
          {userId?.firstName} {userId?.lastName}
        </span>
        </span>
      </td>
      <td className=" pl-3 gap-2 items-center h-full py-1">
        <span className="flex gap-2 items-center  ">
        <span className="inline-flex   size-12 bg-gris/25 rounded-full overflow-hidden">
          <img src={`/ranks/${rank}.svg`} className="object-cover h-full w-full" alt="" />
        </span>
        <span className="first-letter:capitalize">
          {rank}
        </span>
        </span>
      </td>
      <td className="pl-3  ">
        <div className="flex items-center justify-start gap-2">
          <span className="flex items-center justify-start relative">
            <motion.span
            initial={{
                width : 0
            }}
            animate={{
                width : `${(accuracyPercentage*128)/100}px`
            }}
            transition={{
                duration : 0.5,
                ease : 'easeInOut'
            }}
              className={twMerge(` hidden md:inline-flex bg-[#7869FF] dark:bg-indigo-400 h-5 absolute w-[${(accuracyPercentage*128)/100}px]`)}
            ></motion.span>
            <span className={twMerge(`hidden md:inline-flex w-32 bg-gris/25 h-5`)}></span>
          </span>
          <span className={twMerge("flex items-center gap-1" , accuracyPercentage < 70 ? 'text-red-500' : 'text-green-500')}>
            <span>
            <CountUp end={accuracyPercentage} duration={1}/>%
            </span>
            <span>
                {
                   accuracyPercentage < 50 ? 
                   <TrendingDown size={15}/>
                   : 
                   <TrendingUp size={15}/>
                   
                }
            </span>
          </span>
        </div>
      </td>
      <td className="pl-3 hidden md:table-cell">
        <CountUp end={totalPassedQuizzes} duration={1}/>
        /<CountUp end={attempts} duration={1}/>
      </td>
      <td className={twMerge("hidden lg:table-cell pl-3 " , (totalTimeSpent/59) < 50 ? 'text-red-500' : 'text-green-500')}>
       <span className="bg-gris/15 rounded gap-1 flex items-center w-fit px-1 py-1">
       <span>
        {
             (totalTimeSpent/59) < 50 ? <ChevronDown size={14} /> : <ChevronUp size={14} /> 
        }
       </span>
       <span className="text-neutral-600 dark:text-neutral-300">{Math.ceil(totalTimeSpent/59)}</span>
       <span >Mn</span>
       </span>
      </td>
    </tr>
  );
};

export default LeaderBoardCard;
