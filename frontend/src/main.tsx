import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import '@/css/index.css'
import Index from '@/pages/Index'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import "react-big-calendar/lib/css/react-big-calendar.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: Infinity,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId='846393406450-7mopqb3n10vai4na9ojntk77m4g6g2k8.apps.googleusercontent.com' >
        <Index />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
