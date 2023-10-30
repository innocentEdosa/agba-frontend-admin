import { CATEGORIES, CREATE_CATEGORY_MUTATION_KEY } from "@/api/constants/keys";
import queryClient from "@/api/queryClient";
import { createCategory } from "@/api/services/categoryService";
import { useMutation } from "@tanstack/react-query";

export const useCreateCategory = () => {
  return useMutation({
    mutationKey: [CREATE_CATEGORY_MUTATION_KEY],
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES] });
    },
  });
};
