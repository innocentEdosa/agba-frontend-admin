import { useGetMe } from "@/api/hooks/queries/user";
import useAuth from "@/hooks/useAuth";
import { UserContextType } from "@/types";
import React, { createContext } from "react";

export const UserContext = createContext<UserContextType>({
  profile: null,
  loadingProfile: false,
  profileError: null,
  setProfile: () => {},
});

const UserContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAuth();
  const {
    isLoading: loadingProfile,
    error: profileError,
    data: profile,
  } = useGetMe({ isAuth });

  const value = {
    loadingProfile,
    profileError,
    profile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextWrapper;
