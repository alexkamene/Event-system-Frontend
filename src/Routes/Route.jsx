import { createBrowserRouter } from "react-router-dom";
import Main from "../layoutes/Main";

import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Reports from "../pages/Reports";
import Home from "../pages/Home";
import Expenses from "../pages/Expenses";
import AddExpense from "../pages/AddExpense";





export const route = createBrowserRouter([
  {
    path: "/",
    element: <Main />,

    children: [
  
     { path: "/Dashboard",
      element: <Dashboard />,
    },
    { path: "/Reports",
      element: <Reports/>,
    },
    { path: "/",
      element: <Home/>,
    }, 
    
    { path: "/Expenses",
      element: <Expenses/>,
    },
    { path: "/Add-Expenses",
      element: <AddExpense/>,
    }
     
     
     
    ],

    
  },


  {
    path: "/Register",
    element: <Register/>,
  },
  {
    path: "/login",
     element: <Login/>,
  },

]);


export default route;