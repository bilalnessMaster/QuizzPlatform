import { ChevronLeft, ChevronRight } from "lucide-react";
import TilteHeader from "./TilteHeader";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import HomeArrow from "./HomeArrow";

const gender = [
  {
    gender: "male",

    img: "/male.png",
  },
  {
    gender: "female",

    img: "/female.png",
  },
];
const SignupForm = () => {
  const [data, setData] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [currentGender, setCurrentGender] = useState("male");

  return (
    <section className="px-2 space-y-4 ">
      <TilteHeader
        title="hey , hello 👋"
        description="Join our platform for creating and managing professional quizzes and QCMs"
      />
      <div className="w-full flex justify-center gap-2 items-center">
        <button
          onClick={() =>
            setCurrentGender(currentGender === "female" ? "male" : "female")
          }
        >
          <ChevronLeft size={30} />
        </button>
        <div className="size-20 bg-indigo-500 rounded-full flex overflow-hidden ">
          <AnimatePresence mode="popLayout">
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
          </AnimatePresence>
        </div>
        <button
          onClick={() =>
            setCurrentGender(currentGender === "female" ? "male" : "female")
          }
        >
          <ChevronRight size={30} />
        </button>
      </div>
      <form action="" className="space-y-2">
        <div className="flex items-center gap-2">
          <label htmlFor="firstName" className="label flex-1">
            <span>First Name</span>
            <input
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
              type="text"
              name=" lastNamee"
              id="lastName"
              className="input"
              placeholder="Smith"
            />
          </label>
        </div>
        <label htmlFor="email" className="label flex-1">
          <span>Email</span>
          <input
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
            type="text"
            name="password"
            id="password"
            className="input"
            placeholder="example@gmail.com"
          />
        </label>
        <button
          type="submit"
          className=" w-full h-10 rounded-md bg-[#E297Ff] font-dm font-medium text-white"
        >
          Sign up
        </button>
      </form>
      <p className="max-w-md text-sm ">
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
        <Link className="font-medium text-blue-600" to={"/session/signin"}>
          Sign in
        </Link>
      </p>
    </section>
  );
};

export default SignupForm;
