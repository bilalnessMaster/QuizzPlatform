import BackgroundAuth from "@/components/BackgroundAuth"
import HomeArrow from "@/components/HomeArrow"
import { Outlet } from "react-router-dom"


const Auth = () => {
  return (
    <section className="h-screen w-full flex bg-white relative dark:bg-neutral-900">
        <HomeArrow />
        <BackgroundAuth />
        <Outlet />
    </section>
  )
}

export default Auth