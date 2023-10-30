import { GET_ME_KEY } from "@/api/constants/keys";
import { getMe } from "@/api/services/authService";
import { useQuery } from "@tanstack/react-query";

export function useGetMe({ isAuth }: { isAuth: boolean }) {
  return useQuery({
    queryKey: [GET_ME_KEY],
    queryFn: getMe,
    enabled: isAuth,
    refetchOnWindowFocus: false,
  });
}
