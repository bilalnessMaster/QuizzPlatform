

const TilteHeader = ({
    title , 
    description
} : {title : string , description : string}) => {
  return (
    <div className="space-y-2">
        <h1 className="text-4xl font-medium font-dm">{title}</h1>
        <p className="font-dm text-lg text-gray-600 max-w-md leading-5">{description}</p>
    </div>
  )
}

export default TilteHeader