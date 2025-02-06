import ChartActivity from "@/components/ChartActivity";
import Details from "@/components/Details";
import History from "@/components/History";
import Rank from "@/components/Rank";
import TilteHeader from "@/components/TilteHeader";
import axiosInstance from "@/lib/axios";
import { userProps } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

import {


  CheckCircle2,

  HelpCircle,
  LandPlot,
  Percent,
  Timer,

} from "lucide-react";


const Analytics = () => {
  
  const { data: AuthUser } = useQuery<userProps>({ queryKey: ["AuthUser"] });
  const { data: analytics } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/analytics/getanalytics");
      return data?.analytics;
    },
    enabled: !!AuthUser,
  });
  

  return (
    <section className="section overflow-x-auto  relative">
      <TilteHeader title="Analytics" />
      <div className="w-full grid  grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-4  flex flex-col gap-3">
          <Rank />
          <div className="customBg flex items-center justify-center flex-1 flex-wrap gap-2 p-4 ">
            <div className="grid grid-cols-2 gap-2  ">
              <Details
                name="Total questions"
                icon={<HelpCircle size={20} />}
                number={analytics?.totalQuestionsAttempted}
              />
              <Details
                name="Total time spend"
                icon={<Timer size={20} color="brown" />}
                number={1}
              />
              <Details
                name="Passed"
                icon={<CheckCircle2 size={20} color="green" />}
                number={analytics?.totalPassedQuizzes}
              />
              <Details
                name="Questions/Passed "
                icon={<HelpCircle size={20} />}
                number={analytics?.totalCorrectAnswers}
              />
              <Details
                name="Accuracy"
                icon={<Percent size={20} color="#8da2fb" />}
                number={analytics?.accuracyPercentage}
              />
              <Details
                name="place in leaderboard"
                icon={<LandPlot size={20} />}
                number={1}
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8 customBg whitespace-normal p-2 ">
        <TilteHeader
              title="Activity (this week)"
              className={"text-2xl  font-bricolage font-normal"}
            />
          <ChartActivity />
        </div>
        <div className="col-span-12 gap-3 grid lg:grid-cols-2">
          <div className="customBg p-2">
            <TilteHeader
              title="Strong topics"
              className={"text-2xl  font-bricolage font-normal"}
            />
            <div className="flex flex-wrap max-w-lg gap-2">
              {analytics?.strongTopics?.map((topics: any) => (
                <span key={topics?.category} className="btnTopics ">
                  <span className="px-2 py-[0.15rem]">
                    <span>{topics?.category}</span>
                  </span>
                  <span className="  px-2  items-center flex bg-green-200 dark:bg-green-400  rounded-r-full">
                    {topics?.correctAnswers}
                  </span>
                </span>
              ))}
            </div>
          </div>
          <div className="customBg p-2">
            <TilteHeader
              title="Weak topics"
              className={"text-2xl  font-bricolage font-normal"}
            />
            <div className="flex flex-wrap max-w-lg gap-2">
              {analytics?.weakTopics?.map((topics: any) => (
                <span key={topics?.category} className="btnTopics ">
                  <span className="px-2 py-[0.15rem]">
                    <span>{topics?.category}</span>
                  </span>
                  <span className="px-2  items-center flex bg-red-200  dark:bg-red-400   rounded-r-full">
                    {topics?.incorrectAnswers}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      {/* history component */}
      <History />
      </div>
    </section>
  );
};

export default Analytics;
