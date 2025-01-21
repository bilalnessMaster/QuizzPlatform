
import { category, level } from "../lib/dataConfigure";
import { language } from "../lib/dataConfigure";
import { twMerge } from "tailwind-merge";
import { formQcmProps, qcmProps } from "../lib/types";
import { Sparkles } from "lucide-react";
import { useState } from "react";

const QcmForm = () => {
  const [formQcms, setFormQcms] = useState<formQcmProps>({
    category: [],
    language: "",
    numberQcms: 10,
    level: "",
  });
  const handleNumberofQcms = (number: number) => {
    if (number >= 10 && number <= 30) {
      setFormQcms({
        ...formQcms,
        numberQcms: number,
      });
    } else {
      console.log("minimume number is 10 question");
    }
  };
  const handleCategory = (language: string) => {
    setFormQcms((prevState: formQcmProps) => {
      const isAlreadySelected = prevState.category.includes(language);
      const newCategory = isAlreadySelected
        ? prevState.category.filter((item) => item !== language)
        : [...prevState.category, language];
      return {
        ...prevState,
        category: newCategory,
      };
    });
  };
  return (
    <form className="bg-white w-full  px-4   py-4  shader rounded-md ">
      <label className="space-y-4 flex flex-col mb-3">
        <span className="font-Geist text-xl">
          What do you want to focus on?
        </span>
        <div className="flex gap-2 max-w-md flex-wrap ">
          {category.map(({ language }, index) => (
            <span
              onClick={() => handleCategory(language)}
              key={index}
              className={twMerge(
                "btn transition-all",
                formQcms.category.includes(language) &&
                  "bg-secondary/25 text-secondarytwo"
              )}
            >
              {language}
            </span>
          ))}
        </div>
      </label>
      <label className="space-y-4 flex flex-col mb-3">
        <span className="font-Geist text-xl">Choose Your Language</span>
        <div className="flex gap-2 max-w-sm flex-wrap ">
          {language.map(({ id, language }) => (
            <span
              onClick={() => setFormQcms({ ...formQcms, language })}
              key={id}
              className={twMerge(
                "btn transition-all",
                formQcms.language === language &&
                  "bg-secondary/25 text-secondarytwo"
              )}
            >
              {language}
            </span>
          ))}
        </div>
      </label>
      <label className="space-y-4 flex flex-col mb-3">
        <span className="font-Geist text-xl">Choose the Number of QCM</span>
        <div className="bg-gris/25 w-fit px-1 py-1 rounded-full font-dm ">
          <span
            onClick={() => handleNumberofQcms(formQcms.numberQcms - 1)}
            className="w-8 inline-flex justify-center font-medium border-r-2  border-primary/45 text-lg"
          >
            -
          </span>
          <span className="w-12 inline-flex items-center justify-center">
            {formQcms.numberQcms}
          </span>
          <span
            onClick={() => handleNumberofQcms(formQcms.numberQcms + 1)}
            className="w-8 inline-flex justify-center  font-medium border-l-2  border-primary/45 text-lg"
          >
            +
          </span>
        </div>
      </label>
      <label className="space-y-4 flex flex-col mb-6">
        <span className="font-Geist text-xl">Select Quiz’s level</span>
        <div className="flex gap-2 max-w-sm flex-wrap ">
          {level.map(({ id, level }) => (
            <span
              onClick={() => setFormQcms({ ...formQcms, level })}
              key={id}
              className={twMerge(
                "btn transition-all",
                formQcms.level === level && "bg-secondary/25 text-secondarytwo"
              )}
            >
              {level}
            </span>
          ))}
        </div>
      </label>
      <label className="">
      <button className="flex justify-center w-full bg-secondary/35 rounded-full ">
        <span className="flex  items-center gap-2 py-2">
        <span>
          <Sparkles strokeWidth={2}  size={30}/>
        </span>
        <span className="text-3xl font-bricolage">Generate</span>
        </span>
      </button>
      </label>
    </form>
  );
};

export default QcmForm;
