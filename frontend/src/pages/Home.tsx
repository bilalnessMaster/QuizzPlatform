import SwitchMode from "@/components/SwitchMode";


const Home = () => {
  return (
    <section className="section overflow-x-auto  relative">
     <div className="mb-2 text-2xl font-bricolage font-light">
      <h1 >
      WELCOME , <span className="text-indigo-500 ">BILAL HABIB ALLAH</span> 👏
      </h1>
     </div>
     <div className="grid grid-cols-1 gap-3">
      <div className="h-[319px] rounded-md  bg-white shader dark:bg-neutral-800 dark:border border-neutral-700 ">

      </div>

      <div className="h-96 grid md:grid-cols-12 gap-3">
        <div className="md:col-span-4 rounded-md  bg-white  shader dark:bg-neutral-800 dark:border border-neutral-700 ">

        </div>
        <div className="md:col-span-8 rounded-md   bg-white shader dark:bg-neutral-800 dark:border border-neutral-700 ">
         
        </div>
      </div>
     </div>
     <SwitchMode/>
    </section>
  );
};

export default Home;
