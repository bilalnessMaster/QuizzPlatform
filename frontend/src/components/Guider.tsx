

const Guider = () => {
  return (
    <div className=" font-dm text-sm flex gap-2 bg-white px-2 py-1 w-fit absolute -bottom-4 left-1/2 -translate-x-1/2 dark:bg-neutral-700 group-hover/recent:bottom-4 rounded-full transition-all duration-300 ">
        <span className="flex items-center gap-1">
            <span className="inline-flex size-4 rounded-full bg-green-200 dark:bg-green-500"></span>
            <span className="text-green-400 dark:text-green-500 ">PASS</span>
        </span>
        <span className="flex items-center gap-1">
            <span className="bg-red-200 dark:bg-red-500 inline-flex size-4 rounded-full"></span>
            <span className="text-red-400 dark:text-red-500 ">FAILED</span>
        </span>
    </div>
  )
}

export default Guider