import { GET_ME_KEY, GET_USERS, GET_USERS_COUNT } from "@/api/constants/keys";
import { getMe } from "@/api/services/authService";
import { getUsers, getUsersCount } from "@/api/services/userService";
import useAuth from "@/hooks/useAuth";
import { GetRequestParamsType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetMe({ isAuth }: { isAuth: boolean }) {
  return useQuery({
    queryKey: [GET_ME_KEY],
    queryFn: getMe,
    enabled: isAuth,
    refetchOnWindowFocus: false,
  });
}

export function useGetUsers(params: GetRequestParamsType) {
  const auth = useAuth();
  return useQuery({
    queryKey: [GET_USERS, params],
    queryFn: () => getUsers(params),
    enabled: auth?.isAuth,
  });
}

export function useGetUsersCount() {
  const auth = useAuth();
  return useQuery({
    queryKey: [GET_USERS_COUNT],
    queryFn: getUsersCount,
    enabled: auth?.isAuth,
  });
}
