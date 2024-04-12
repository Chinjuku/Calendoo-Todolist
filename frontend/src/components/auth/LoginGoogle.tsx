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
      <button onClick={authContext.logoutUser}>Logout</button>
      <div>{authContext.isAuthenticated ? "true" : "false"}</div>
    </div>
  );
};

export default LoginGoogle;
