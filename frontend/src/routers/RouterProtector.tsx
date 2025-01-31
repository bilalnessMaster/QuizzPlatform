import axiosInstance from "@/lib/axios"
import { userProps } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation } from "react-router-dom"


const RouterProtector = ({children}: {children : React.ReactNode}) => {
    const location = useLocation()
    const {data : AuthUser , isLoading} = useQuery<userProps>({
        queryKey : ['AuthUser'] , 
        queryFn : async () =>{ 
          try {
            const {data}= await axiosInstance.get('/auth/me')
            return data
          } catch (error) {
            return null
          }
        }
      })
    
    if(isLoading) return 'loading ...'
    if(AuthUser && location.pathname.includes('session')){
        console.log('auther exists');
        
        return <Navigate to={'/user/'} />
    }
    if(!AuthUser &&  location.pathname.includes('/user')){
        console.log('dont exists');
        return <Navigate to={'/session/signin'} />
    }
    return children
}

export default RouterProtector