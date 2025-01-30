import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Generate from "../pages/Generate";
import Auth from "@/pages/Auth";
import SignUp from "@/components/SignUp";


export const router = createBrowserRouter([
    {
        path : "/user", 
        element : <App />,
        children : [
            {
                path : "/user/home",
                element : <Home />
            },
            {
                path : "/user/tests",
                element : <Home />
            },
            {
                path : "/user/generate",
                element : <Generate />
            }
        ]
    } , 
    {
        path : '/session' , 
        element : <Auth/>,
        children : [
            {
                path: '/session/',
                element : <SignUp/>
            }
        ]
    }
])