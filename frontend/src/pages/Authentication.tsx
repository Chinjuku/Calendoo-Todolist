import { GoogleLogin } from '@react-oauth/google';
import { Toaster } from '@/components/ui/toaster';
import { handleGoogleLogin } from '@/api/post/googleauth';

const Authentication = () => {
  return (
    <div>
        <Toaster />
        <GoogleLogin 
            onSuccess={handleGoogleLogin}
            onError={() => {
            console.log("Login Failed");
            }}
            useOneTap
        />
        <button onClick={() => localStorage.removeItem("token")}>Logout</button>
    </div>
    
  )
}

export default Authentication