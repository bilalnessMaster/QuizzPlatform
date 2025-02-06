
import { Moon, Sun } from "lucide-react";
import { memo, useEffect, useState } from "react";

const SwitchMode = memo(() => {
  const [mode, setMode] = useState("light");
  let style = localStorage.getItem("darkMode");
  let isDarkMode =  style ? JSON.parse(style) : false;
  useEffect(()=>{
      if(isDarkMode){
        setMode('dark')
        document.documentElement.classList.add("dark");
      }else{
        setMode('light')
        document.documentElement.classList.remove("dark");
      }
  },[])
 
 
  useEffect(()=>{
    if(mode == 'dark'){
      localStorage.setItem("darkMode", 'true');
      document.documentElement.classList.add("dark");
    }else{
      localStorage.setItem("darkMode", 'false');
      document.documentElement.classList.remove("dark");
    }
  },[mode])

  const handleSwitch = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };
  return (
    <button
      onClick={handleSwitch}
      className="dark:bg-neutral-800 fixed bottom-4 border right-12 size-12 bg-white shader items-center flex  justify-center rounded-full  dark:border-neutral-50"
    >
      {!(mode === "dark") ? (
        <Moon />
      ) : (
        <Sun />
      )}
    </button>
  );
});

export default SwitchMode;
