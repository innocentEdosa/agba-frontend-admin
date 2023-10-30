import http from "@/api/htttp";
import lsKeys from "@/constants/lsKeys";
import checkIsTokenExpired from "@/utils/checkIsTokenExpired";
import ls from "@/utils/localStorage";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import SecureLS from "secure-ls";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const ls = new SecureLS();
    let tokenParams = ls.get(lsKeys.auth);
    if (checkIsTokenExpired(tokenParams?.token?.expires_at)) {
      setIsAuth(false);
    } else {
      http.setAuth(tokenParams?.token?.token);
      setIsAuth(true);
    }
  }, []);

  const handleLoginsuccess = useCallback(
    (params: { token: { token: string; expires_at: string } }) => {
      http.setAuth(params?.token?.token);
      ls?.set(lsKeys.auth, params);

      setIsAuth(true);
    },
    []
  );

  return { isAuth, handleLoginsuccess };
};

export default useAuth;
