import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axios";
import { useAiQcmStore } from "@/stores/useAiQcmStore";
import { useMutation } from "@tanstack/react-query";
import { Loader, Play, Sparkles } from "lucide-react";
import { useState } from "react";
import Help from "../Help";

const AiQcmForm = () => {
  const [prompt ,setPrompt] =useState('')
  const {toast}= useToast()
  const {
      setQcmData,
      QcmsData,
      setStart,
    } = useAiQcmStore();
    const { mutate: fetchingQcm, isPending } = useMutation({
      mutationKey: ["fetchingQcm"],
      mutationFn: async (topic: string) => {
        const {data} = await axiosInstance.post("/ai/generatedQuizz", {topic});
      
        return data?.qcms;
      },
      onSuccess: (data: any) => {
       
        if(data?.length > 0){
          setQcmData(data);
        }else{
          toast({
            title : "Warning",
            description : 'There is no quizz under this category'
          })
        }
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong"+error,
        });
      },
    });
     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(prompt !== ''){
          fetchingQcm(prompt);
        }else{
          toast({
            title : 'Warning',
            description : 'dont leave the prompt empty'
          })
        }
        
      };
  return (
    <form onSubmit={handleSubmit} className="customBg px-2 py-5 flex flex-col gap-4 relative">
      <label
        htmlFor="
        "
        className="label"
      >
        <span className="font-dm text-lg ">Whats in your mind </span>
        <textarea
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
          name="prompt"
          className="w-full dark:bg-neutral-600  bg-[#F6F6F6] rounded outline-none border-none text-sm "
          placeholder="e.g., Give me a hard quiz about science with 15 questions   "
          id=""
        ></textarea>
      </label>
      <label className="">
        {QcmsData?.length > 0 ? (
          <button
            type="button"
            className="flex justify-center w-full group/start bg-secondary/25 rounded-full "
            disabled={isPending}
            onClick={() => setStart(true)}
          >
            <span className="flex  group-hover/start:gap-1 transition-all duration-300 items-center gap-4 py-2">
              <span>
                <Play strokeWidth={2} size={30} />
              </span>
              <span className="text-3xl font-bricolage">Start</span>
            </span>
          </button>
        ) : (
          <button
            type="submit"
            className="flex justify-center group/generate w-full h-12 items-center  bg-btnColor rounded dark:bg-neutral-600 "
            disabled={isPending}
          >
            {isPending? (
            <span>
              <Loader strokeWidth={2} size={25} className="transition-all  animate-spin " />
            </span>
            ) : (
              <span className="flex  group-hover/generate:gap-1 transition-all duration-300 items-center gap-4 py-2">
                <span>
                  <Sparkles strokeWidth={1.2} size={30} />
                </span>
                <span className="text-3xl font-bricolage">Generate</span>
              </span>
            )}
          </button>
        )}
      </label>
      <Help description="this is powered by ai and may makes errors" />
    </form>
  );
};

export default AiQcmForm;
