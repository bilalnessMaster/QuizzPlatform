
import {motion} from 'framer-motion'
import { twMerge } from 'tailwind-merge'
const Wrapper = ({children ,className } : { className?: string ,children : React.ReactNode
}) => {
  return (
    <motion.div
    initial={{
        opacity : 0
      }}
      animate={{
        opacity  :1 
      }}
    transition={{
      duration : .4,
      ease : 'anticipate'
    }}
     className={twMerge('section  relative' ,className)}>
        {children}
    </motion.div>
  )
}

export default Wrapper