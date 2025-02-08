
import RencetActivities from "@/components/RencetActivities";
import Quote from "@/components/Quote";
import Rank from "@/components/Rank";
import Streaks from "@/components/Streaks";
import SwitchMode from "@/components/SwitchMode";
import axiosInstance from "@/lib/axios";
import { userProps } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Home = () => {
  const { data: AuthUser } = useQuery<userProps>({ queryKey: ["AuthUser"] });
  const { data: recent, isLoading } = useQuery({
    queryKey: ["RecentActivities","home"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/qcm/history");
      return data?.attempts;
    },
    enabled: !!AuthUser,
  });

  const { data: quote, } = useQuery({
    queryKey: ["quote"],
    queryFn: async () => {
      const {data} = await axios.get("https://api.api-ninjas.com/v1/quotes"       , {
        headers : {
          "X-Api-Key": "xNSrFYrKuc3sDJf1G5ti5A==NWKUZ8MBOeVMOOlB"
        }
      });
      return data
    },
    enabled: !!AuthUser,
  });


  return (
    <section className="section overflow-x-auto  relative">
      <div className="mb-2 text-2xl font-bricolage font-light">
        <h1>
          Welcome ,{" "}
          <span className="text-indigo-500 capitalize">
            {AuthUser?.firstName} {AuthUser?.lastName}
          </span>{" "}
          👏
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <div className="h-[319px] rounded-md  bg-white shader dark:bg-neutral-800 dark:border border-neutral-700 flex ">
         <Quote content={quote[0]?.quote} author={quote[0]?.author} />
       
          <div className="flex-1 hidden lg:block">
              <img src="/VectorRandom.png" className="object-cover w-full  h-full" alt="" />
          </div>

        </div>
        <div className="grid md:grid-cols-12 gap-3 md:justify-start md:items-start  ">
          <div className="col-span-12 lg:col-span-4 rounded-md gap-3 flex flex-col h-full ">
            <Rank />
            <Streaks streak={AuthUser?.streak} />
          </div>
          <RencetActivities samples={6} recent={recent} isLoading={isLoading} />
        </div>
      </div>
      <SwitchMode />
    </section>
  );
};

export default Home;
