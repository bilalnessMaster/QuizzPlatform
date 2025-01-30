import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const HomeArrow = () => {
  return (
    <Link
      to={"/"}
      className="absolute  top-5 left-5 px-3 py-2 font-medium text-xl  overflow-clip  lg:bg-white  rounded-full items-center  lg:text-black z-30 flex justify-start w-12 transition-all duration-500 hover:w-32 
        text-white bg-black
      "
    >
     <div className="flex  items-center gap-4 ">
     <ArrowLeft size={25} />
     <span className="font-bricolage">HOME</span>
     </div>
     
    </Link>
  );
};

export default HomeArrow;
