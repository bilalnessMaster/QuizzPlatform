import TilteHeader from '@/components/TilteHeader'
import Updateform from '@/components/Updateform'
import Wrapper from '@/components/Wrapper'
import React from 'react'

const Setting = () => {
  return (
    <Wrapper className="section overflow-x-auto  relative">
        <TilteHeader
        title="Update Profile"
       
        />
        <Updateform />
    </Wrapper>
  )
}

export default Setting