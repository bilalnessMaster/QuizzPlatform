import React from 'react'

const Quote = ({content , author}: {content : string , author: string}) => {
  return (
    <div className="flex-1 flex flex-col gap-2 font-bricolage text-3xl justify-center items-center">
    <p className="text-center max-w-xl ">
    {content}
    </p>

    <p>-  {author} -</p>
</div>
  )
}

export default Quote