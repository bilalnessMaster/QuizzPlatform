import {
  AlignJustify,
  Check,
  Home,
  Sparkles,
  Star,
  Timer,
  X,
} from "lucide-react";
import Details from "./Details";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQcmStore } from "../stores/useQcmStore";
import CountUp from "react-countup";
const Result = () => {
  const navigate = useNavigate();
  const { completed, time, score, QcmsData, ResetQcmDetails, accuracy } =
    useQcmStore();
  const handleReset = () => {
    ResetQcmDetails();
    navigate("/user/home");
  };
  const percentage = 50
  return (
    <>
      {completed && (
        <>
          {" "}
          <div className="absolute backdrop-blur-[2px] inset-0 bg-white/5 max-bg transition-all duration-300"></div>
          <motion.div
            initial={{
              opacity: 0,
              filter: "blur(4px)",
              y: 200,
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="bg-white absolute shader w-2/3 lg:w-[600px] px-2 pb-3 pt-4 rounded-md space-y-8"
          >
            
            <div className="flex items-center justify-center">
              <div className="relative">
              <svg
                  width="251"
                  height="129"
                  viewBox={`0 0 251 129`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-all duration-300 absolute"
                >
                  <motion.path
                    d={`M10 119.001C35.5 -41.5001 231.5 -9.5 241.5 117`}
                    stroke="#DD86FF"
                    strokeWidth="19"
                    strokeLinecap="round"
                    initial={{
                      pathLength : 0
                    }}
                    animate={{
                      pathLength : accuracy/100 //
                    }}
                    transition={{
                      duration : 4  , delay : .4
                    }}
                   
                  />  
                
                </svg>
                <svg
                  width="251"
                  height="129"
                  viewBox={`0 0 251 129`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-all duration-300"
                >
                  <path
                    d={`M10 119.001C35.5 -41.5001 231.5 -9.5 241.5 117`}
                    stroke="#F6F7FB"
                    strokeWidth="19"
                    strokeLinecap="round"
                  />  
                
                </svg>
                <span className="absolute flex flex-col items-center  font-medium font-bricolage text-secondarytwo left-1/2 top-1/2 -translate-x-1/2">
                  <span className="text-4xl"><CountUp end={Math.ceil(accuracy)} duration={4} />%</span>
                  <span className="text-gray-400">Accuracy</span>
                </span>
              </div>
            </div>
            <div className="grid lg:grid-cols-5 grid-cols-2 md:grid-cols-3 gap-2">
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
                name="Time"
                icon={<Timer size={20} color="brown" />}
                number={time}
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
            </div>
            <div className="flex items-center gap-2 ">
              <button
                onClick={handleReset}
                className="bg-gris/25 flex justify-center flex-1 py-2 rounded-md "
              >
                <span>
                  <Home strokeWidth={1.1} size={30} />
                </span>
              </button>
              <button
                onClick={ResetQcmDetails}
                className="flex-1 flex justify-center bg-secondary/25 rounded-md px-2 hover:gap-1 transition-all duration-300 items-center gap-4 py-2"
              >
                <span>
                  <Sparkles strokeWidth={1.1} size={30} />
                </span>
                <span className="text-2xl font-bricolage">Generate</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Result;
