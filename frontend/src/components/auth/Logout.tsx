import { useContext } from "react";
import { AuthContext } from "@/middleware/useAuth"

const Logout = () => {
  const authContext = useContext(AuthContext);
  return (
    <button onClick={authContext.logoutUser}>Logout</button>
  )
}

export default Logout