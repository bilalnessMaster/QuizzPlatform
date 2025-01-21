import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"


const App = () => {
  return (
   <section className="flex ">
    <Navbar />
    <Outlet />
   </section>
  )
}

export default App