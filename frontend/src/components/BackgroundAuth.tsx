
const BackgroundAuth = () => {
  return (
    <div className="flex-1 p-2 h-screen overflow-hidden relative hidden lg:block ">
      
      <div className="h-full relative w-full ">
        <div className="bg-gradient-to-br h-full w-full rounded-xl from-black to-transparent absolute z-20 " />
        <div className="z-20 absolute  p-24">
          <h1 className="text-8xl max-w-2xl font-medium font-bricolage px-2 text-btnColor">Digital platform for creating quizzes and QCMs.</h1>
        </div>
        <div className="h-full rounded-lg">
        <video
         src="/background.mp4"
          loop
          muted
          autoPlay
          className="h-full w-full object-cover rounded-2xl"
        />
        
        </div>
      </div>
    </div>
  );
};

export default BackgroundAuth;
