import QcmForm from "../../components/QcmForm"
import QcmsQuestions from "../../components/QcmsQuestions.tsx"
import { useQcmStore } from "../../stores/useQcmStore.tsx"


const Generate = () => {
  const {start} = useQcmStore()

  
  return (
    <section className='section flex justify-center items-center relative'>
        { !start ? 
         ( <div className='md:w-1/2 '>
          <QcmForm/>
        </div>) : (
            <QcmsQuestions/>
          )
        }
    </section>
  )
}

export default Generate