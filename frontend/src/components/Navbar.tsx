import LinksItem from "./LinksItem";
import Logout from "./Logout";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAnimationControls } from "framer-motion";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { links } from "../lib/dataConfigure";
import { useQuery } from "@tanstack/react-query";
import { userProps } from "@/lib/types";

const Navbar = () => {
  const {data : AuthUser} = useQuery<userProps>({queryKey : ['AuthUser']})
  const [isOpen, setIsOpen] = useState(false);
  const containerController = useAnimationControls();
  const [search , setSearch]= useState('')
  const [linksItems , setlinksItems]= useState(links)
  const container = {
    close: {
      width: "3.2rem",
      transition: {
        type: "spring",
        damping: 15,
        duration: 0.5,
      },
    },
    open: {
      width: "17rem",
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 15,
      },
    },
  };
  
  useEffect(() => {
    if (isOpen) {
      containerController.start("open");
    } else {
      containerController.start("close");
    }
  }, [isOpen ,containerController]);
  useEffect(() => {
   if(search){
    const regx = new RegExp(search , 'igm')
    const filter = linksItems.filter((item)=> item.name.match(regx))
    setlinksItems(filter)
    
   }else{
    setlinksItems(links)
   }
  }, [search ,linksItems]);

  return (
    <motion.aside
      variants={container}
      initial="close"
      animate={containerController}
      style={{
 
      }}
      className="px-3 py-4 customBg hidden    h-screen w-80 md:flex flex-col justify-between overflow-hidden z-20 "
    >
      <div className="space-y-14 ">
        <div className="flex items-center justify-between">
          <h1
            className={twMerge(
              " items-center justify-start gap-3 transition-all  whitespace-nowrap duration-300 flex" , !isOpen && 'hidden'
            )}
          >
            <span>
              <Sparkles strokeWidth={1.3} />
            </span>
            <span className="text-3xl font-bricolage">Generator</span>
          </h1>

          <span
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer size-8 rounded-full inline-flex items-center justify-center bg-gris/45"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={twMerge(
                "transition-all rotate-180  duration-300",
                isOpen && "rotate-0"
              )}
            >
              <path
                d="M8.75 16.25L2.5 10M2.5 10L8.75 3.75M2.5 10L17.5 10"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className={twMerge("space-y-8")}>
          <div className="">
            <label
              htmlFor="Search"
              className={twMerge(
                "relative opacity-0 transition-all  ",
                isOpen && "opacity-100"
              )}
            >
              <input
                type="text"
                name="Search"
                id="Search"
                disabled={!isOpen}
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="transition-all  duration-300 text-xs outline-none w-full bg-gris/45 h-8 font-light font-dm rounded-sm pl-9 "
                placeholder="Setting .."
              />
              <span className="absolute  left-2 inset-y-0">
                <Search className="w-4 text-black/45 dark:text-neutral-200" />
              </span>
            </label>
          </div>
          <div className="flex flex-col gap-5">
            {linksItems.map(({ name, href, icon }, index) => (
              <LinksItem key={index} name={name} href={href} icon={icon} isOpen={isOpen} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-16">
        <Logout user={AuthUser} isOpen={isOpen} />
      </div>
    </motion.aside>
  );
};

export default Navbar;
