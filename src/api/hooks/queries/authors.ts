import { AUTHOR_LIST, GET_AUTHORS_COUNT } from "@/api/constants/keys";
import { getAuthors, getAuthorsCount } from "@/api/services/authorService";
import useAuth from "@/hooks/useAuth";
import { GetRequestParamsType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetAuthors = (params: GetRequestParamsType) => {
  const auth = useAuth();
  return useQuery({
    queryKey: [AUTHOR_LIST, params],
    queryFn: () => getAuthors(params),
    enabled: auth?.isAuth,
  });
};

export const useGetAuthorsCount = () => {
  const auth = useAuth();
  return useQuery({
    queryKey: [AUTHOR_LIST, GET_AUTHORS_COUNT],
    queryFn: getAuthorsCount,
    enabled: auth?.isAuth,
  });
};
