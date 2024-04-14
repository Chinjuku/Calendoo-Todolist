
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/middleware/useAuth';
// import { useContext } from "react";
// import { AuthContext } from "@/middleware/useAuth"
import Login from '@/components/auth/Login';
import { useState } from 'react';
import '@/css/authentication.css';
import todo1 from '/image/todo1.png'
import todo2 from '/image/todo2.png'
import Register from '@/components/auth/Register';

const Authentication = () => {
  const [login, setLogin] = useState(true)

  return (
    <AuthProvider>
      <div className="bg-primary h-screen w-full items-center flex-col flex justify-center">
      <button className={`px-[20px] py-[10px] bg-primary1 authbutton rounded-lg  hover:bg-hover1 text-secondary font-bold transition-all mb-4 ${login ? 'active' : ''}`} onClick={() => setLogin(prevLogin => !prevLogin)}>
          {
            login ? <h1>If you not have account? <u>Switch to Register??</u></h1> 
            : <h1>If you not have account? <u>Switch to Login??</u></h1>
          }
        </button>
        <div className='flex w-[75%] p-5 rounded-xl bg-secondary1'>
        <div style={{ backgroundImage : `url(${todo2})` }} className='w-1/2 bg-cover'>
            <div className={`auth-container w-full bg-primary flex items-center justify-center py-10 h-full ${login ? 'active' : ''}`}>
              <Login />
            </div>
          </div>
          <div style={{ backgroundImage : `url(${todo1})` }} className='w-1/2 bg-cover'>
            <div className={`auth-container w-full bg-primary flex items-center justify-center py-10 h-full ${!login ? 'active' : ''}`}>
              <Register handleSwitch={(bools) => setLogin(bools)} />
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </AuthProvider>
  )
}

export default Authentication;
