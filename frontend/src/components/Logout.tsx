import { LogOut } from "lucide-react"


const Logout = () => {
  return (
    <div className="flex justify-between items-center  ">
      <div className="flex items-center text-xs font-dm gap-4">
        <div className="size-7 rounded-full bg-gris  overflow-hidden ">
        </div>
        <div className="leading-[1rem] font-medium">
            <h2>@bilalMaster</h2>
            <h2 className="text-black/35 dark:text-neutral-300/55">bilal@gmail.com</h2>
        </div>
      </div>
      <button className="text-black/75 dark:text-neutral-300">
        <LogOut size={19}/>
      </button>
    </div>
  )
}

export default Logout