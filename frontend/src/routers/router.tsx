import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Generate from "../pages/Generate";


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
    }
])