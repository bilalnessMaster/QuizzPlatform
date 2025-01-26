import  { useEffect, useState } from "react";
import Timer from "./Timer";
import { useQcmStore } from "../stores/useQcmStore";

const Watch = () => {
  const [watch, setWatch] = useState(0);
  const {completed ,setTime} = useQcmStore()
  useEffect(() => {
    const timer = setInterval(()=>{
      setWatch((prevState)=>prevState+1)
    },1000)
    return () => {
      clearInterval(timer);
    };
  },[]);
  useEffect(() => {
    if(completed){
      setTime(watch)
    }
  },[completed ,setTime]);
  
  return (
    <div className="absolute flex top-4 right-4 font-Geist text-2xl font-light ">
      <Timer second={Math.round((watch/59))} /> : <Timer second={Math.round((watch%59))} />
    </div>
  );
};

export default Watch;
