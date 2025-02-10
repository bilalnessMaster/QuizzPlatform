import { useEffect } from "react"
import QcmForm from "../../components/QcmForm"
import QcmsQuestions from "../../components/QcmsQuestions.tsx"
import { useQcmStore } from "../../stores/useQcmStore.tsx"
import Wrapper from "@/components/Wrapper.tsx"


const Generate = () => {
  const {start ,ResetQcmDetails} = useQcmStore()
  useEffect(()=>{
    ResetQcmDetails()
  },[ResetQcmDetails])

  
  return (
    <Wrapper className='section flex justify-center items-center relative'>
        { !start ? 
         ( <div className='md:w-1/2 '>
          <QcmForm/>
        </div>) : (
            <QcmsQuestions/>
          )
        }
    </Wrapper>
  )
}

export default Generate