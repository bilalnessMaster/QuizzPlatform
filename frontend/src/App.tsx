import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { Toaster } from "./components/ui/toaster"


const App = () => {
  return (
    <>
   <section className="flex">
    <Navbar />
    <Outlet />
   </section>
    <Toaster />
   </>
  )
}

export default App