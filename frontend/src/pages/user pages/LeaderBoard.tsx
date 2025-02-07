
import LeaderBoardCard from "@/components/LeaderBoardCard";
import LeaderBoardCardSkeleton from "@/components/LeaderBoardCardSkeleton";
import TilteHeader from "@/components/TilteHeader";
import axiosInstance from "@/lib/axios";
import { leaderboardProps } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";


const LeaderBoard = () => {
  const [pagination, setPagination] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data: leaderboardData, isLoading } = useQuery<leaderboardProps[]>({
    queryKey: ["leaderboardData"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/leaderboard/getleaderboard?page=${1}&limit=${10}`
      );
      setPagination(data?.currentPage)
      setTotalPages(data?.totalPages)
      return data?.leaderboard;
    },
  });
  console.log(leaderboardData);
  
  return (
    <section className="section  relative">
      <TilteHeader title="Leaderboard" />
      <div className="w-full h-[95%] customBg overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0">
            <tr className="font-dm font-semibold h-14  customBg text-sm text-neutral-500">
              <td className="w-32 pl-3">Position</td>
              <td className=" pl-3">Name</td>
              <td className=" pl-3">Rank</td>
              <td className=" pl-3">Accuracy</td>
              <td className=" pl-3 hidden md:table-cell ">
                <span className="flex gap-1">
                <span>
                Quizzes</span> 
                <span className="hidden lg:flex">(Pass/Attempts)</span>
                </span>
              </td>
              <td className=" pl-3 hidden lg:table-cell">Total times</td>
            </tr>
          </thead>
          <tbody className="">
            {isLoading
              ? (
                Array.from({ length: 10 }, (_, index) => (
                  <LeaderBoardCardSkeleton  key={index} />
                ))
              )
              : (leaderboardData?.length ?? 0) > 0
              ? leaderboardData?.map(
                  (player: leaderboardProps, index: number) => (
                    <LeaderBoardCard key={index} {...player} index={index} />
                  )
                )
              : "empty"}
           
             
          </tbody>
        </table>
        {(leaderboardData?.length ?? 0) > 0 && (
          <div className="flex items-center px-2 absolute right-12 bottom-12 justify-end gap-1 font-bricolage mt-3">
       
            <div className="flex items-center justify-center gap-2">
              <button
                disabled={pagination <= totalPages}
                onClick={() => setPagination(pagination - 1)}
                className="inline-flex items-center justify-center uppercase text-sm   font-semibold -gap-1 customBg size-12 rounded-full bg-gris  p-1 disabled:opacity-25"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                disabled={pagination >= totalPages}
                onClick={() => setPagination(pagination + 1)}
                className="inline-flex items-center  uppercase text-sm size-12 rounded-full justify-center bg-gris font-semibold -gap-1 customBg p-1 disabled:opacity-20"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LeaderBoard;
