import { AUTHOR_LIST, GET_AUTHORS_COUNT } from "@/api/constants/keys";
import { getAuthors, getAuthorsCount } from "@/api/services/authorService";
import { GetRequestParamsType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetAuthors = (params: GetRequestParamsType) => {
  return useQuery({
    queryKey: [AUTHOR_LIST, params],
    queryFn: () => getAuthors(params),
  });
};

export const useGetAuthorsCount = () => {
  return useQuery({
    queryKey: [AUTHOR_LIST, GET_AUTHORS_COUNT],
    queryFn: getAuthorsCount,
  });
};
