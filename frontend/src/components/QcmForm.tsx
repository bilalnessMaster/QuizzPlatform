import { category, level } from "../lib/dataConfigure";
import { language } from "../lib/dataConfigure";
import { twMerge } from "tailwind-merge";
import { formQcmProps } from "../lib/types";
import { Play, Sparkles } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import { useQcmStore } from "../stores/useQcmStore";

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
  const  {setQcmData , QcmsData ,setStart} = useQcmStore()
  const {mutate :fetchingQcm ,isPending } = useMutation({
    mutationKey : ['fetchingQcm'],
    mutationFn : async (formQcms:formQcmProps ) => {
      try {
        const response = await axiosInstance.post('/qcm/getqcms' , formQcms)
        return response.data
      } catch (error) {
        console.log('error occured while fetching qcm '+error);
        
      }
    },
    onSuccess : (data : any) =>{
      setQcmData(data?.qcms)
    }
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchingQcm(formQcms)
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-full  px-4   py-4  shader rounded-md "
    >
      <label className="space-y-4 flex flex-col mb-3">
        <span className="font-Geist text-xl">
          What do you want to focus on?
        </span>
        <div className="flex gap-2 max-w-md flex-wrap ">
          {category.map(({ language }, index) => (
            <button
              type="button"
              onClick={() => handleCategory(language)}
              key={index}
              className={twMerge(
                "btn transition-all duration-300",
                formQcms.category.includes(language) &&
                  "bg-secondary/25 text-secondarytwo"
              )}
              aria-label={`Select category ${language}`}
            >
              {language}
            </button>
          ))}
        </div>
      </label>
      <label className="space-y-4 flex flex-col mb-3">
        <span className="font-Geist text-xl">Choose Your Language</span>
        <div className="flex gap-2 max-w-sm flex-wrap ">
          {language.map(({ id, language }) => (
            <button
              type="button"
              onClick={() => setFormQcms({ ...formQcms, language })}
              key={id}
              className={twMerge(
                "btn transition-all duration-300",
                formQcms.language === language &&
                  "bg-secondary/25 text-secondarytwo"
              )}
            >
              {language}
            </button>
          ))}
        </div>
      </label>
      <label className="space-y-4 flex flex-col mb-3">
        <span className="font-Geist text-xl">Choose the Number of QCM</span>
        <div className="bg-gris/25 w-fit px-1 py-1 rounded-full font-dm ">
          <span
            onClick={() => handleNumberofQcms(formQcms.numberQcms - 1)}
            className="w-8 inline-flex justify-center  font-medium border-r-2  border-primary/45 text-lg"
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
            <button
              type="button"
              onClick={() => setFormQcms({ ...formQcms, level })}
              key={id}
              className={twMerge(
                "btn transition-all duration-300",
                formQcms.level === level && "bg-secondary/25 text-secondarytwo"
              )}
            >
              {level}
            </button>
          ))}
        </div>
      </label>
      <label className="">
        {QcmsData.length > 10 ? (
          <button
            type="button"
            className="flex justify-center w-full group/start bg-secondary/25 rounded-full "
            disabled={isPending}
            onClick={()=>setStart(true)}

          >
            <span className="flex  group-hover/start:gap-1 transition-all duration-300 items-center gap-4 py-2">
              <span>
                <Play  strokeWidth={2} size={30}  />
              </span>
              <span className="text-3xl font-bricolage">Start</span>
            </span>
          </button>
        ) : (
          <button
            type="submit"
            className="flex justify-center group/generate w-full bg-secondary/35 rounded-full "
            disabled={isPending}
          >
            {
              isPending ? "loading..." : (
                <span className="flex  group-hover/generate:gap-1 transition-all duration-300 items-center gap-4 py-2">
                <span>
                  <Sparkles strokeWidth={2} size={30} />
                </span>
                <span className="text-3xl font-bricolage">Generate</span>
              </span>
              )
            }
          </button>
    )}
      </label>
    </form>
  );
};

export default QcmForm;
