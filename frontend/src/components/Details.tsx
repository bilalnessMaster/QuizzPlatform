
import CountUp from "react-countup";

const Details = ({
  name,
  icon,
  number,
}: {
  name: string;
  icon: React.ReactNode;
  number: number;
}) => {

  
  return (
    <span className="flex flex-col font-dm text-lg">
      <span className="text-primary font-light w-24 truncate ... sm:w-full ">{name}</span>
      <span className="flex items-center gap-2">
        <span>{icon}</span>
        <span>
          {
            name !== 'Time' ? <CountUp end={number} duration={4}/> : (
              <span>
                <span><CountUp end={Math.floor(number/59)} duration={4} formattingFn={(val)=> val.toString().padStart(2, '0')}/></span>
                <span>:</span>
                <span><CountUp end={Math.floor(number%59)} duration={4} formattingFn={(val)=> val.toString().padStart(2, '0')}/></span>
              </span>
            )
          }
        </span>
      </span>
    </span>
  );
};

export default Details;
