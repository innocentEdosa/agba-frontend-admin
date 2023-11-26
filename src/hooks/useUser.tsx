import { useContext } from "react";
import { UserContext } from "@/contexts/user";

const useUser = () => {
  const userState = useContext(UserContext);

  return userState;
};

export default useUser;
