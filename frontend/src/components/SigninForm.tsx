
import TilteHeader from "./TilteHeader";

import {  motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  SignInformSchema } from "@/lib/formValidation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

const SigninForm = () => {
  const queryClient= useQueryClient()
  const {toast}= useToast()
  const {
    register,
    handleSubmit,  
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInformSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {mutate : signup , isPending}= useMutation({
    mutationFn : async (formData : z.infer<typeof SignInformSchema>) => { 
      const {data}= await axiosInstance.post('/auth/signin', formData)
      return data
    },
    onSuccess :  (data : {message? : string}) => { 
      queryClient.invalidateQueries({
        queryKey : ['AuthUser']
      })
      toast({
        title: 'Success', 
        description: data?.message
      })
    },
    onError : (error : Error & {response : any})=> {
      console.log(error);
      
      toast({
        variant : "destructive",
        title: 'Error', 
        description: error?.response?.data?.message
      })
    }
  })
  const onSubmit = (data: z.infer<typeof SignInformSchema>) => {
    signup(data)
  };
  
  return (
    <section className="space-y-8 w-full md:max-w-lg">
      <TilteHeader
        title="Welcome, back 👋"
        description="What are you waiting for sign in"
      />

      <form onSubmit={handleSubmit(onSubmit)} action="" className="space-y-2 ">
        
        
        <label htmlFor="email" className="label flex-1">
          <span>Email</span>
          <input
            {...register("email")}
            type="text"
            name="email"
            id="email"
            className="input"
            placeholder="example@gmail.com"
          />
        </label>
        <label htmlFor="password" className="label flex-1">
          <span>password</span>
          <input
            {...register("password")}
            type="password"
            name="password"
            id="password"
            className="input"
            placeholder="ex : NSMKmI&t6s"
          />
        </label>
        <button
          type="submit"
          disabled={isPending}
          className=" w-full h-10 rounded-md bg-[#E297Ff] flex items-center justify-center font-dm font-medium text-white"
        >
          {isPending ? (
            <div className="size-5 border-2 border-white/25 rounded-full border-t-2 border-t-white animate-spin " />
          ) : (
            "Sign in"
          )}
        </button>
        {/* later */}
        {/* <div className="border-b border-gray-100  w-full  relative ">
          <span className="inline-flex absolute size-6 bg-white start-1/2  items-center justify-center rounded-full ">or</span>
        </div> */}
        <p className="font-normal text-sm ">
          You dont have an account{" "}
          <Link className="font-medium text-blue-600" to={"/session/"}>
            Sign up
          </Link>
        </p>
      </form>
      { errors?.email ?<motion.div 
      initial={{
        marginTop : 0,
        opacity: 0
      }}
      animate={{
        margin : 20,
        opacity : 1
      }}
      className="">
        <ul className="bg-gray-50 rounded-md px-2 py-1 font-dm text-sm text-red-600 ">
          <li>{errors?.email?.message}</li>
          <li>{errors?.password?.message}</li>
        </ul> 
      </motion.div>
        : null}    
    </section>
  );
};

export default SigninForm;
// const [data, setData] = useState<any>({
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
// });
