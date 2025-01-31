
import { ResultCardProps } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";

const HistoryCard = ({
  category,
  createdAt,
  language,
  maxScore,
  score,
  status,
  _id,
}:ResultCardProps) => {
  return (
    <div
      key={_id}
      className={twMerge(
        " bg-green-200 dark:bg-green-500 p-1 rounded-md flex justify-between items-center font-dm text-sm dark:text-neutral-200",
      status === "failed" && "bg-red-200 dark:bg-red-500"
      )}
    >
      <div className="space-x-2 flex items-center">
        <span className="inline-flex size-10 bg-white dark:text-neutral-500 rounded-full items-center justify-center ">
          {score}/{maxScore}
        </span>
        <span className="capitalize">Language : {language}</span>
        <p className=" w-64 truncate hidden lg:block">
          Categories : {category?.join(", ")}
        </p>
      </div>
      <span>
        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
      </span>
    </div>
  );
};

export default HistoryCard;
