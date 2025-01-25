import { memo, useEffect, useState } from "react"
import {AnimatePresence, motion} from 'framer-motion'

const Timer = memo(({second}: {second : number}) => {
    const [time , setTime]= useState(second.toString().padStart(2,'0'))
    useEffect(()=>{
    setTime(second.toString().padStart(2,'0'))
    },[second])
    return (
    <AnimatePresence mode="popLayout" >
        
        {
            time.split('').map((s , index)=>(
                <motion.span 
                className="tabular-nums"
                initial={{
                    y : 12 , filter : "blur(3px)" , opacity : 0
                }}
                animate ={{
                    y : 0 , filter : "blur(0px)" , opacity : 1
                }}
                    
                transition={{
                    type : 'spring' , 
                    bounce  : .35 , 
                    duration : 0.8
                }}
                exit={{
                    y : -12 , filter : "blur(3px)" , opacity : 0
                }}
                key={index+s}>{s}</motion.span>
            ))
        }
    </AnimatePresence>
  )
})

export default Timer