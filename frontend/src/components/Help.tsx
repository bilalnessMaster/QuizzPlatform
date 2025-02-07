import { HelpCircle } from "lucide-react"

const Help = ({description}: {description  ?: string }) => {
  return (
    <span className="inline-flex flex-col justify-end items-end absolute  px-2 py-1 hover:bg-gris/25 top-2 right-2 group/help" >
        <span>
            <HelpCircle size={15} />
        </span>
        <span className="opacity-0 duration-200 font-dm capitalize text-neutral-700 group-hover/help:opacity-100 max-w-32 text-xs text-balance">
            {description}
        </span>
    </span>
  )
}

export default Help