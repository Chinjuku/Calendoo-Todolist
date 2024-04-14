import { useContext } from "react";
import { AuthContext } from "@/middleware/useAuth"
import { LuLogOut } from "react-icons/lu";

const Logout = () => {
  const authContext = useContext(AuthContext);
  return (
    <button className="flex items-center" onClick={authContext.logoutUser}>Logout <LuLogOut /></button>
  )
}

export default Logout