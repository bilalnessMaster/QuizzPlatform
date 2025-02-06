import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import TilteHeader from "./TilteHeader";
import { twMerge } from "tailwind-merge";
import { Check, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Answer, QuizResult } from "@/lib/types";
import { Link } from "react-router-dom";
import HistoryCardSkeleton from "./HistoryCardSkeleton";

const History = () => {
  const [currentIndex, setCurrentIndex] = useState(12312);
  const [pagination, setPagination] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10
  const { data: History, isLoading } = useQuery<QuizResult[] | undefined>({
    queryKey: ["RecentActivities", pagination],
    queryFn: async (page) => {
      const { data } = await axiosInstance.get(`/qcm/history?page=${pagination}&limit=${limit}`);
      setTotalPages(data?.totalPages);
      return data?.attempts;
    },
  });

  console.log(totalPages);
  

  return (
    <div className="col-span-12 p-2 customBg">
      <TilteHeader
        title="History"
        className={"text-2xl  font-bricolage font-normal"}
      />
      <div className="space-y-2">
        { isLoading ?(
                Array.from({ length: 10 }, (_, index) => (
                  <HistoryCardSkeleton key={index} />
                ))
              ) : (History?.length ?? 0) > 0 ? History?.map((item: QuizResult, index: number) => (
          <div
            key={item._id}
            className={twMerge(
              "flex flex-col bg-green-200 dark:bg-neutral-700   p-2 rounded-md overflow-hidden  "
            )}
          >
            <div className="flex justify-between items-center mb-[0.2rem]">
              <div className="space-x-2 flex items-center">
                <span className={twMerge("inline-flex size-10 font-semibold bg-white dark:text-neutral-500 rounded-full items-center justify-center " , item?.status === 'failed' ? 'dark:bg-red-500 dark:text-red-900' :'dark:bg-green-500 dark:text-green-900 ' )}>
                  {item?.score}/{item?.maxScore}
                </span>
                <span className="capitalize">Language : {item?.language}</span>
                <p className=" w-64 truncate hidden lg:block">
                  Categories : {item?.category?.join(", ")}
                </p>
              </div>
              <button onClick={() => setCurrentIndex(index)}>
                <ChevronDown className={twMerge('transition-all duration-200 rotate-0' , currentIndex === index && '-rotate-180')} />
              </button>
            </div>
            <AnimatePresence>
              {currentIndex === index && (
                <motion.div
                  initial={{
                    height: "0.4rem",
                  }}
                  animate={{
                    height: "auto",
                  }}
                  exit={{
                    height: "0.4rem",
                  }}
                  className="pl-0 md:pl-12 font-dm space-y-1 "
                >
                  {item?.selectedAnswers?.map(
                    (
                      res: (typeof item.selectedAnswers)[number],
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="bg-white rounded-md dark:bg-neutral-600 p-1"
                      >
                        <h1 className="font-medium font-Geist">
                          <span>Question : </span>
                          <span>{res.question}</span>
                        </h1>
                        <div className="">
                          <span>Selected answers : </span>
                          {res?.answers?.map(
                            (
                              answer: Answer,
                              index: number
                            ) => (
                              <span
                                key={index}
                                className="flex items-center gap-2 pl-5"
                              >
                                <span>
                                  {answer?.right ? (
                                    <Check size={20} color="green" />
                                  ) : (
                                    <X size={20} color="red" />
                                  )}
                                </span>
                                <span>{answer?.answer}</span>
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))  :   (
            <div className="flex items-center justify-center w-full h-full">
              <div className="flex items-center justify-center flex-col gap-2">
                <div className="flex items-center justify-center flex-col ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={.9}
                  stroke="currentColor"
                  className="size-20 text-gray-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
                <p className="font-medium font-dm text-gray-300 text-sm">No activity yet</p>
                </div>
                <Link to={'/user/generate qcm'} className="start">start now!</Link>
              </div>
            </div>
          )
        
        
        }
      </div>
      {( History?.length ?? 0) > 0 && (
        <div className="flex items-center justify-end gap-1 font-bricolage mt-3">
          {/* <p className="flex gap-2 ">
            <span>result</span>
            <span>{19}</span>
          </p> */}
          <div className="flex items-center justify-center gap-2">
            <button 
            disabled={
                pagination <= totalPages
            }
            onClick={() => setPagination(pagination-1)} 
            className="inline-flex items-center uppercase text-sm  rounded-md font-semibold -gap-1 customBg  p-1 disabled:opacity-25">
              <ChevronLeft size={15} /> <span>Previous</span>
            </button>
            <span className="customBg w-12 inline-flex items-center justify-center rounded-md">
              {pagination}
            </span>
            <button 
             disabled={
                pagination >= totalPages
             }
             onClick={() => setPagination(pagination+1)}
            className="inline-flex items-center  uppercase text-sm  rounded-md font-semibold -gap-1 customBg p-1 disabled:opacity-20">
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
