import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios"

const chartData = [
    { day: "Sunday", attempts:0  },
    { day: "Monday", attempts:0  },
    { day: "Tuesday", attempts:0  },
    { day: "Wednesday", attempts:0},
    { day: "Thursday", attempts: 0},
    { day: "Friday", attempts:0  },
    { day: "Saturday", attempts:  0},
  ]
const ChartActivity = () => {
    const chartConfig = {
        desktop: {
          label: "attempts",
          color: "#962DFF",
        }
      } satisfies ChartConfig
    const {data:activities} = useQuery({
        queryKey : ['activitiesPerDay'],
        queryFn : async () => { 
            const {data} = await axiosInstance.get('analytics/attemptsPerday')
            
            return data?.formattedAttempts
        }
    }) 
  return (
    <div className="w-full h-full flex justify-center  ">
       <div className="max-w-[700px] w-full">
       <ChartContainer config={chartConfig}  className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={activities}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={true}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={true}
          tickMargin={10}
          axisLine={true} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="attempts" fill="var(--color-desktop)" radius={5} />
        
      </BarChart>
    </ChartContainer>
       </div>
    </div>
    )
}

export default ChartActivity