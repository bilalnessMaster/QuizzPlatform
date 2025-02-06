import { Link } from "react-router-dom"
import HistoryCardSkeleton from "./HistoryCardSkeleton"
import { ResultCardProps } from "@/lib/types"
import RecentCard from "./RecentCard"
import Guider from "./Guider"


const RencetActivities = ({recent , isLoading, samples = 6}:{recent : ResultCardProps[] , isLoading: boolean , samples: number }) => {
  return (
        <div className="col-span-12 lg:col-span-8 rounded-md p-2 group/recent h-full bg-white shader dark:bg-neutral-800 dark:border border-neutral-700 relative overflow-hidden  ">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl  font-bricolage">Recent activities</h1>
              <Link
                to={"/user/analytics"}
                className="border-b-2 font-dm font-medium text-secondarytwo border-secondarytwo text-sm dark:text-indigo-500 dark:border-indigo-500"
              >
                See all history
              </Link>
            </div>
            <div className="space-y-1 lg:space-y-2 w-full h-full ">
              {isLoading ? (
                Array.from({ length: samples }, (_, index) => (
                  <HistoryCardSkeleton key={index} />
                ))
              ) : recent?.length > 0 ? (
                recent?.map((attempt: ResultCardProps) => (
                  <RecentCard key={attempt?._id} {...attempt} />
                ))
              ) : (
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
              )}
            </div>
            <Guider />
          </div>
  )
}

export default RencetActivities