import { twMerge } from "tailwind-merge";

const LeaderBoardCardSkeleton = () => {
  return (
    <tr
      className={twMerge(
        "font-bricolage tabular-nums font-semibold h-20 text-sm text-neutral-600 border-b-2 border-neutral-200/45 animate-pulse"
      )}
    >
      <td className="w-32 pl-3 font-bricolage text-xl  ">
        <span className="inline-flex size-4 bg-gris/45 rounded-lg"></span>
      </td>
      <td className=" pl-3 gap-2 items-center h-full py-1">
        <span className="flex gap-2 items-center  ">
          <span className="inline-flex justify-center items-center size-12 bg-gris/25 rounded-full"></span>
          <span className="first-letter:capitalize inline-flex w-32 h-5 bg-gris/25 rounded"></span>
        </span>
      </td>
      <td className="pl-3  ">
        <div className="flex items-center justify-start gap-2">
          <span className="flex items-center justify-start relative">
            <span
              className={twMerge(
                `transition-all duration-300 inline-flex bg-[#7869FF] h-5 absolute `
              )}
            ></span>
            <span className={twMerge(`inline-flex w-32 bg-gris/25 h-5`)}></span>
          </span>
          <span className={twMerge("flex items-center gap-1")}>
            <span></span>
            <span></span>
          </span>
        </div>
      </td>
      <td className="pl-3 hidden md:table-cell ">
        <div className="inline-flex w-12 h-5 bg-gris/45 rounded"></div>
      </td>
      <td className={twMerge("hidden md:table-cell pl-3")}>
        <div className=" w-12 h-4 bg-gris/45 rounded"></div>
        <span></span>
      </td>
    </tr>
  );
};

export default LeaderBoardCardSkeleton;
