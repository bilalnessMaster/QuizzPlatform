
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
      <span className="text-primary font-light">{name}</span>
      <span className="flex items-center gap-2">
        <span>{icon}</span>
        <span>
          {
            name !== 'Time' ? <CountUp end={number} duration={4}/> : (
              <span>
                <span><CountUp end={Math.floor(number/59)} duration={4}/></span>
                <span>:</span>
                <span><CountUp end={Math.floor(number%59)} duration={4}/></span>
              </span>
            )
          }
        </span>
      </span>
    </span>
  );
};

export default Details;
