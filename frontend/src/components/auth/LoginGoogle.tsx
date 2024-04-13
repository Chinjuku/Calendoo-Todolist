import { GoogleLogin } from '@react-oauth/google';
import { useContext } from "react";
import { AuthContext } from "@/middleware/useAuth"

const LoginGoogle = () => {
    const authContext = useContext(AuthContext);

  return (
    <div>
      <GoogleLogin
        // onSuccess={handleGoogleLogin}
        onSuccess={authContext.loginUser}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      />
      <div>{authContext.isAuthenticated ? "true" : "false"}</div>
    </div>
  );
};

export default LoginGoogle;
