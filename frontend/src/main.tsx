import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import '@/css/index.css'
import Index from '@/pages/Index'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='846393406450-7mopqb3n10vai4na9ojntk77m4g6g2k8.apps.googleusercontent.com' >
      <Index />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
