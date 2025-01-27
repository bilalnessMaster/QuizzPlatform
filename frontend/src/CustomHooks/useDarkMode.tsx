import { useEffect, useState } from "react";

const useDarkMode = () => {
  const[isDarkMode , setIsDarkMode]= useState(()=>{
    const style= localStorage.getItem("darkMode");
    return style ? JSON.parse(style) : false;
  });
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return {isDarkMode , setIsDarkMode};
};

export default useDarkMode;
