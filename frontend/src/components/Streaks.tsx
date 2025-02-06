
const Streaks = ({ streak }: { streak: number | undefined}) => {
  return (
    <div className="bg-white flex-1  dark:bg-neutral-800 dark:border border-neutral-700  shader rounded-md p-2 flex flex-col">
      <div>
        <h1 className="text-2xl  font-bricolage">Streaks</h1>
      </div>
      <div className="flex flex-col justify-center items-center flex-1 font-bricolage text-4xl text-secondarytwo dark:text-indigo-400">
        <h1>{streak}</h1>
        <span>{streak === 1 ? "Day" : "Days"}</span>
      </div>
    </div>
  );
};

export default Streaks;
