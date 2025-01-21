import { useState } from "react";
import QcmForm from "../components/QcmForm"
import { formQcmProps } from "../lib/types";


const Generate = () => {
 
  return (
    <section className='section flex justify-center '>
        <div className='md:w-1/2 '>
           <QcmForm/>
        </div>
    </section>
  )
}

export default Generate