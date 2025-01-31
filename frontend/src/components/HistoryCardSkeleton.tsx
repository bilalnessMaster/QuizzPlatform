

const HistoryCardSkeleton = () => {
  return (
    <div className="bg-gray-50 dark:bg-neutral-500 p-1 rounded-md flex justify-between items-center animate-pulse  ">
      <div className="space-x-2 flex items-center">
        <span className="inline-flex size-10 bg-neutral-200 rounded-full animate-pulse items-center justify-center "></span>
        <span className="h-4 w-20 bg-neutral-200 rounded-full animate-pulse"></span>
        <p className="h-4  bg-neutral-200 rounded-full w-64 animate-pulse "></p>
      </div>
      <span className="h-4 w-20 bg-neutral-200 rounded-full animate-pulse"></span>
    </div>
  );
};

export default HistoryCardSkeleton;
