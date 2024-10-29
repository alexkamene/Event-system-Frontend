import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import { route } from './Routes/Route.jsx'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { AuthProvider } from './context/Authcontext.jsx'





const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(


    
<QueryClientProvider client={queryClient}>
   <AuthProvider>
    <RouterProvider router={route}>

    </RouterProvider>

</AuthProvider>
    </QueryClientProvider>
   







    
  
)
