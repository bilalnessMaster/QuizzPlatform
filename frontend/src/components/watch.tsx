import  { useEffect, useState } from "react";
import Timer from "./Timer";

const Watch = () => {
  const [watch, setWatch] = useState(0);
  useEffect(() => {
    const timer = setInterval(()=>{
      setWatch((prevState)=>prevState+1)
    },1000)
    return () => {
      clearInterval(timer);
    };
  },[]);

  
  return (
    <div className="absolute flex top-4 right-4 font-Geist text-2xl font-light ">
      <Timer second={Math.round((watch/59))} /> : <Timer second={Math.round((watch%59))} />
    </div>
  );
};

export default Watch;
