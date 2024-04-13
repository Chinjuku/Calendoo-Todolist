
import { Toaster } from '@/components/ui/toaster';
// import { handleGoogleLogin } from '@/api/post/googleauth';
import { AuthProvider } from '@/middleware/useAuth';
import { useContext } from "react";
import { AuthContext } from "@/middleware/useAuth"
import LoginGoogle from '@/components/auth/LoginGoogle';

const Authentication = () => {
  const authContext = useContext(AuthContext);
  console.log(authContext.isAuthenticated)
  return (
    <AuthProvider>
        <LoginGoogle/>
        <Toaster />
    </AuthProvider>
  )
}

export default Authentication