
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/middleware/useAuth';
// import { useContext } from "react";
// import { AuthContext } from "@/middleware/useAuth"
import Login from '@/components/auth/Login';
import { useState } from 'react';
import '@/css/authentication.css'; // Import CSS file for animations

const Authentication = () => {
  const [login, setLogin] = useState(true)
  // const authContext = useContext(AuthContext);
  // console.log(authContext.isAuthenticated)

  return (
    <AuthProvider>
      <div className="bg-primary h-screen w-full items-center flex-col flex justify-center">
        <button onClick={() => setLogin(prevLogin => !prevLogin)}>
          Switch to {
            login ? 'Register' : 'Login'
          }
        </button>
        <div className='flex w-[75%] border border-secondary'>
          <div className={`auth-container w-1/2 ${login ? 'active' : ''}`}>
            <Login />
          </div>
          <div className={`auth-container w-1/2 ${!login ? 'active' : ''}`}>
            <div>kuy</div>
          </div>
        </div>
        <Toaster />
      </div>
    </AuthProvider>
  )
}

export default Authentication;
