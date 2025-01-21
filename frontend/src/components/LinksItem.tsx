

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const LinksItem = ({name , href , icon} : {name : string , href : string , icon : React.ReactNode}) => {
    const location = useLocation()
    
    
    return (
    <Link to={href} className='flex items-center gap-4 whitespace-nowrap'>
        <span className={twMerge('transition-colors duration-300   delay-200 text-black' , location.pathname.includes(name) && 'text-indigo-600 ')}>
            {icon}
        </span>
        <span className={twMerge('capitalize text-sm font-dm text-gray-500',location.pathname.includes(name) && 'text-black')}>{name}</span>
    </Link>
  )
}

export default LinksItem