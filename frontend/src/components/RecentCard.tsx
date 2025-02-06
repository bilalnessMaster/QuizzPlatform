
import { ResultCardProps } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";

const RecentCard = ({
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
        " bg-green-100 dark:bg-neutral-700 p-1 rounded-md flex justify-between items-center font-dm text-sm dark:text-neutral-200 sm:last:hidden md:last:flex ",
      status === "failed" && "bg-red-100 "
      )}
    >
      <div className="space-x-2 flex items-center">
        <span className={twMerge("inline-flex size-10 font-semibold bg-white dark:text-neutral-500 rounded-full items-center justify-center " , status === 'failed' ? 'dark:bg-red-500 dark:text-red-900' :'dark:bg-green-500 dark:text-green-900 ' )}>
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

export default RecentCard;
