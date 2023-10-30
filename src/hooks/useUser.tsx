import { useGetMe } from "@/api/hooks/queries/user";
import useAuth from "./useAuth";

const useUser = () => {
  const { isAuth } = useAuth();
  const {
    isLoading: isProfileLoading,
    data: profile,
    error: profileError,
  } = useGetMe({ isAuth });

  return {
    isProfileLoading,
    profile,
    profileError,
  };
};

export default useUser;
