

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const LinksItem = ({name , href , icon , isOpen} : {name : string , href : string , icon : React.ReactNode , isOpen : boolean}) => {
    const location = useLocation()
    
    
    return (
    <Link to={href} className='flex items-center gap-4 whitespace-nowrap '>
        <span className={twMerge('transition-colors duration-300 dark:text-neutral-300  delay-200 text-black' , location.pathname.includes(name) && 'text-indigo-600 dark:text-indigo-500')}>
            {icon}
        </span>
        <span className={twMerge('capitalize text-sm font-dm text-gray-500 dark:text-neutral-300 hidden',location.pathname.includes(name) && 'text-black dark:text-indigo-400 ', isOpen && 'block' )}>{name}</span>
    </Link>
  )
}

export default LinksItem