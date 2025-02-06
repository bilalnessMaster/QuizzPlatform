import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axios";
import { updateformSchema } from "@/lib/formValidation";
import { userProps } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
const Updateform = () => {
  const queryClient = useQueryClient()
  const { data: AuthUser } = useQuery<userProps>({ queryKey: ["AuthUser"] });
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateformSchema),
    defaultValues: {
      gender: AuthUser?.gender ?? '',
      firstName: AuthUser?.firstName ?? '',
      lastName: AuthUser?.lastName ?? '',
      email: AuthUser?.email ?? '',
      password: "",
      newPassword : ""
    },
  });
  const { mutate: update, isPending } = useMutation({
    mutationFn: async (formData: z.infer<typeof updateformSchema>) => {
      const { data } = await axiosInstance.put("/auth/update", formData);
      return data;
    },
    onSuccess: (data: { message?: string }) => {
      queryClient.invalidateQueries({queryKey : ["AuthUser"]})
      toast({
        title: "Success",
        description: data?.message,
      });
    },
    onError: (error: Error & { response: any }) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message,
      });
    },
  });
  const onSubmit : (data : z.infer<typeof updateformSchema>) => void = (data: z.infer<typeof updateformSchema>) => {
    update(data);
  };
  for (const key in errors ){
        if(errors[key as keyof typeof errors ]){

        }
    
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="space-y-2 max-w-xl bg-white dark:bg-neutral-800 dark:border border-neutral-700  px-2 py-4 rounded-md"
      >
        <div className="flex items-center gap-2">
          <label htmlFor="firstName" className="label flex-1">
            <span>First Name</span>
            <input
              {...register("firstName")}
              type="text"
              name="firstName"
              id="firstName"
              className="input dark:bg-neutral-700"
              placeholder="John"
            />
          </label>
          <label htmlFor="lastName" className="label flex-1">
            <span>Last Name</span>
            <input
              {...register("lastName")}
              type="text"
              name="lastName"
              id="lastName"
              className="input dark:bg-neutral-700"
              placeholder="Smith"
            />
          </label>
        </div>
        <label htmlFor="email" className="label">
          <span>Email</span>
          <input
            {...register("email")}
            type="text"
            name="email"
            id="email"
            className="input dark:bg-neutral-700"
            placeholder="example@gmail.com"
          />
        </label>
        <label htmlFor="gender" className="label  ">
          <span>Gender</span>
          <select id="" {...register("gender")} className="input dark:bg-neutral-700">
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </label>
        <label htmlFor="newPassword" className="label ">
          <span>New Password </span>
          <input
            {...register("newPassword")}
            type="password"
            name="newPassword"
            id="newPassword"
            className="input  dark:bg-neutral-700"
            placeholder="ex : NSMKmI&t6s"
          />
        </label>
        <label htmlFor="password" className="label ">
          <span>Password <span className="text-indigo-400">"</span>enter your password to apply the changes <span className="text-indigo-400">"</span></span>
          <input
            {...register("password")}
            type="password"
            name="password"
            id="password"
            className="input  dark:bg-neutral-700"
            placeholder="Your current password"
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
            "Update"
          )}
        </button>
      </form>
      {errors.firstName ? (
        <motion.div
          initial={{
            marginTop: 10,
            y: -10, // Moves up initially
            x: -10,
            opacity: 0,
          }}
          animate={{
            marginTop: 10,
            y: 0,
            x: 0,
            opacity: 1,
          }}
          className="bg-white mt-10 max-w-xl rounded-md font-dm text-sm text-red-600 px-1 "
        >
          <ul>
            <li className="first-letter:capitalize flex items-center gap-1">
              <span className="inline-flex size-1 rounded-full bg-red-600"></span>
              <span> {errors?.firstName?.message}</span>
            </li>
            <li className="first-letter:capitalize flex items-center gap-1">
              <span className="inline-flex size-1 rounded-full bg-red-600"></span>
              {errors?.lastName?.message}
            </li>
            <li className="first-letter:capitalize flex items-center gap-1">
              <span className="inline-flex size-1 rounded-full bg-red-600"></span>
              {errors?.email?.message}
            </li>
            <li className="first-letter:capitalize flex items-center gap-1">
              <span className="inline-flex size-1 rounded-full bg-red-600"></span>
              {errors?.password?.message}
            </li>
          </ul>
        </motion.div>
      ) : null}
    </>
  );
};

export default Updateform;
