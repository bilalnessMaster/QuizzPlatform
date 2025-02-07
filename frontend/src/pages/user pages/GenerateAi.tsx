import AiQcmForm from '@/components/ai components/AiQcmForm'
import AiQcmsQuestions from '@/components/ai components/AiQcmsQuestions'
import TilteHeader from '@/components/TilteHeader'
import { useAiQcmStore } from '@/stores/useAiQcmStore'

const GenerateAi = () => {

    const {start } = useAiQcmStore()
 

  
  return (
    <section className='section flex justify-center items-center relative overflow-auto'>
        { !start ? 
         ( <div className='md:w-1/2 '>
          <TilteHeader title='Customize  Your QCMs the way you in any topics' className='font-bricolage md:text-3xl' />
          <AiQcmForm/>
        </div>) : (
            <AiQcmsQuestions/>
          )
        }
    </section>
  )

}

export default GenerateAi