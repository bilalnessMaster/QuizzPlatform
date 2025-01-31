import Guider from "@/components/guider";
import HistoryCard from "@/components/HistoryCard";
import HistoryCardSkeleton from "@/components/HistoryCardSkeleton";
import SwitchMode from "@/components/SwitchMode";
import axiosInstance from "@/lib/axios";
import { ResultCardProps, userProps } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Home = () => {
  const { data: AuthUser } = useQuery<userProps>({ queryKey: ["AuthUser"] });
  const { data: recent, isLoading } = useQuery({
    queryKey: ["RecentActivities"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/qcm/history");
      return data?.attempts;
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
        <div className="h-[319px] rounded-md  bg-white shader dark:bg-neutral-800 dark:border border-neutral-700 "></div>

        <div className="h-96 grid md:grid-cols-12 gap-3 ">
          <div className="md:col-span-4 rounded-md  bg-white  shader dark:bg-neutral-800 dark:border border-neutral-700 "></div>
          <div className="md:col-span-8 rounded-md p-2 group/recent  bg-white shader dark:bg-neutral-800 dark:border border-neutral-700 relative overflow-hidden  ">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-xl  font-bricolage">Recent activities</h1>
              <Link
                to={"/user/analytics"}
                className="border-b-2 font-dm font-medium text-secondarytwo border-secondarytwo text-sm dark:text-indigo-500 dark:border-indigo-500"
              >
                See all history
              </Link>
            </div>
            <div className="space-y-1 lg:space-y-2">
              {isLoading
                ? Array.from({ length: 6 }, (_, index) => (
                  <HistoryCardSkeleton key={index} />
                ))
                : recent?.map((attempt: ResultCardProps) => (
                    <HistoryCard key={attempt?._id} {...attempt} />
                  ))}
            </div>
            <Guider />
          </div>
        </div>
      </div>
      <SwitchMode />
    </section>
  );
};

export default Home;
