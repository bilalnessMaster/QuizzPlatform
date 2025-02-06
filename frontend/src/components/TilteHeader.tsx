import { twMerge } from "tailwind-merge"


const TilteHeader = ({
    title , 
    description,
    className
} : {title : string , description ?: string , className?:string}) => {
  return (
    <div className="space-y-2 w-full text-black dark:text-neutral-200">
        <h1 className={twMerge("text-4xl font-medium font-dm", className)}>{title}</h1>
        <p className="font-dm text-lg text-gray-600 max-w-sm leading-5 ">{description}</p>
    </div>
  )
}

export default TilteHeader