import { AuthContext } from "@/contexts/auth";
import { useContext } from "react";

const useAuth = () => {
  const authState = useContext(AuthContext);
  return authState;
};

export default useAuth;
