import useDarkMode from "@/CustomHooks/useDarkMode";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const SwitchMode = () => {
  const [mode, setMode] = useState("light");
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, [isDarkMode]);
  useEffect(()=>{
    if(mode == 'dark'){
      document.documentElement.classList.add("dark");
    }else{
      document.documentElement.classList.remove("dark");
    }
  },[mode])

  const handleSwitch = () => {
    localStorage.setItem("darkMode", mode === "dark" ? "true" : "false");
    setMode(mode === "dark" ? "light" : "dark");
  };
  console.log('df');
  
  return (
    <button
      onClick={handleSwitch}
      className="dark:bg-neutral-800 absolute bottom-4 border- right-4 size-12 bg-white shader items-center flex  justify-center rounded-full"
    >
      {!(mode === "dark") ? (
        <Moon />
      ) : (
        <Sun />
      )}
    </button>
  );
};

export default SwitchMode;
