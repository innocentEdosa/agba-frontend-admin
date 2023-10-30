import { AUTHOR_LIST } from "@/api/constants/keys";
import { getAuthors } from "@/api/services/authorService";
import { GetRequestParamsType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetAuthors = (params: GetRequestParamsType) => {
  return useQuery({
    queryKey: [AUTHOR_LIST, params],
    queryFn: () => getAuthors(params),
  });
};
