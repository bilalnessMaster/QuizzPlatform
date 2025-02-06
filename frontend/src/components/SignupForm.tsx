import { ChevronLeft, ChevronRight } from "lucide-react";
import TilteHeader from "./TilteHeader";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpformSchema } from "@/lib/formValidation";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
const gender = [
  {
    gender: "male",

    img: "/gender/male.png",
  },
  {
    gender: "female",

    img: "/gender/female.png",
  },
];
const SignupForm = () => {
  const { toast } = useToast();
  const [currentGender, setCurrentGender] = useState("male");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpformSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const { mutate: signup, isPending } = useMutation({
    mutationFn: async (formData: z.infer<typeof SignUpformSchema>) => {
      const { data } = await axiosInstance.post("/auth/signup", {
        ...formData,
        gender: currentGender,
      });
      return data;
    },
    onSuccess: (data: { message?: string }) => {
      toast({
        title: "Success",
        description: data?.message,
      });
    },
    onError: (error: Error & { response: any }) => {
      console.log(error);

      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message,
      });
    },
  });
  const onSubmit = (data: z.infer<typeof SignUpformSchema>) => {
    signup(data);
  };

  return (
    <section className="space-y-8 px-2 w-full sm:max-w-lg">
      <TilteHeader
        title="hey , hello 👋"
        description="Join our platform for creating and managing professional quizzes and QCMs"
      />

      <form onSubmit={handleSubmit(onSubmit)} action="" className="space-y-2 ">
        <label className="w-full flex justify-center gap-2 items-center mb-11">
          <button
            type="button"
            onClick={() =>
              setCurrentGender(currentGender === "female" ? "male" : "female")
            }
          >
            <ChevronLeft size={30} />
          </button>
          <div className="size-20 bg-indigo-500 rounded-full flex overflow-hidden ">
            {gender.map(({ gender, img }) => (
              <motion.img
                key={gender}
                className="h-28"
                initial={{
                  x: currentGender === "female" ? -20 : 0,
                  y: 0,
                }}
                animate={{
                  y: 0,
                  x: currentGender === "female" ? -80 : 0,
                }}
                exit={{
                  x: 20,
                }}
                transition={{
                  duration: 1,
                  type: "spring",
                }}
                src={img}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              setCurrentGender(currentGender === "female" ? "male" : "female")
            }
          >
            <ChevronRight size={30} />
          </button>
        </label>
        <div className="flex items-center gap-2">
          <label htmlFor="firstName" className="label flex-1">
            <span>First Name</span>
            <input
              {...register("firstName")}
              type="text"
              name="firstName"
              id="firstName"
              className="input"
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
              className="input"
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
            className="input"
            placeholder="example@gmail.com"
          />
        </label>
        <label htmlFor="password" className="label ">
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
            "Sign up"
          )}
        </button>
        <p className="max-w-sm text-sm ">
          By confirming your email , you agree to our{" "}
          <Link to={"/terms"} className="font-medium underline">
            Terms of serveice
          </Link>{" "}
          and that you read and understood our{" "}
          <Link className="font-medium underline" to={"/policy"}>
            Privacy Policy{" "}
          </Link>
        </p>
        <p className="font-normal text-sm">
          Your already have an account{" "}
          <Link className="font-medium text-blue-600 " to={"/session/signin"}>
            Sign in
          </Link>
        </p>
      </form>
      {errors.firstName ? (
        <motion.div
          initial={{
            marginTop: 0,
            opacity: 0,
          }}
          animate={{
            margin: 20,
            opacity: 1,
          }}
          className="bg-gray-50 rounded-md font-dm text-sm text-red-600 px-1 "
        >
          <ul>
            <li className="first-letter:capitalize">
              {errors?.firstName?.message}
            </li>
            <li className="first-letter:capitalize">
              {errors?.lastName?.message}
            </li>
            <li className="first-letter:capitalize">
              {errors?.email?.message}
            </li>
            <li className="first-letter:capitalize">
              {errors?.password?.message}
            </li>
          </ul>
        </motion.div>
      ) : null}
    </section>
  );
};

export default SignupForm;
// const [data, setData] = useState<any>({
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
// });
