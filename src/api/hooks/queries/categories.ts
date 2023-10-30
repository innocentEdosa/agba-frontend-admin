import { CATEGORIES } from "@/api/constants/keys";
import { getCategories } from "@/api/services/categoryService";
import { GetRequestParamsType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = (params: GetRequestParamsType) => {
  return useQuery({
    queryKey: [CATEGORIES, params],
    queryFn: () => getCategories(params),
  });
};
