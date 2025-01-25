import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routers/router.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const Client = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={Client}>
   <RouterProvider  router={router}/>
    </QueryClientProvider>
  </StrictMode>,
)
