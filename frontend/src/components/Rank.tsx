import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Crown } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Rank = () => {
  const {toast}= useToast()
  const {data : rank ,isError}= useQuery({
    queryKey : ['rank'] , 
    queryFn : async ()=>{
      const {data}= await axiosInstance.get('/leaderboard/rank')
      return data
    }
  })
  useEffect(()=>{
    if(isError){
      toast({
        title : 'Info',
        description: 'you need to play 2 or 3 games to reveal your rank'
      })
    }
  },[isError])
  return (
    <div className="bg-white max-h-48 customBg  shader rounded-md p-2">
      <div>
        <h1 className="text-2xl  font-bricolage">your rank</h1>
      </div>
      <div className="flex justify-between items-center ">
        <p className="text-[16px] max-w-64 font-dm text-balance ">
          Work more to open new ranks and achieve greatness, the more you play
          the more you claim{" "}
        </p>
        <span className="inline-flex size-24 group/rank bg-gris/45 rounded-full justify-center items-center relative dark:bg-neutral-700">
        
        <img src={`/ranks/${rank?.rank}.svg`} alt="" />
        <span className="font-bricolage font-medium absolute -bottom-7 opacity-0 transition-all  duration-300 group-hover/rank:opacity-100">{rank?.rank}</span>
        </span>
      </div>
      <div className="w-full  h-12 flex items-center justify-start gap-4">
        <Link to={"/user/generate qcm"} className="start h-9">
          Start now!
        </Link>
        <Link
          to={"/user/leaderboard"}
          className="text-secondarytwo  dark:text-indigo-400 font-dm font-medium flex items-center gap-2"
        >
          <span>
            <Crown size={20}/>
          </span>
          <span>Leaderboard</span>
          <span>
            <svg
              width="22"
              height="22"
              color="#8da2fb"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="dark:text-indigo-400"
            >
              <path
                d="M13.8956 6.88668L7.12984 14.1379M13.8956 6.88668L14.0776 12.143M13.8956 6.88668L8.63922 7.06873"
                stroke="#8da2fb"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Rank;
