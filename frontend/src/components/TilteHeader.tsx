

const TilteHeader = ({
    title , 
    description
} : {title : string , description : string}) => {
  return (
    <div className="space-y-2 w-full text-black dark:text-neutral-200">
        <h1 className="text-4xl font-medium font-dm">{title}</h1>
        <p className="font-dm text-lg text-gray-600 max-w-sm leading-5 ">{description}</p>
    </div>
  )
}

export default TilteHeader