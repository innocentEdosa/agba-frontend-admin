import {
  CATEGORIES,
  CREATE_CATEGORY_MUTATION_KEY,
  DELETE_CATEGORIES_MUTATION_KEY,
  UPDATE_CATEGORY_MUTATION_KEY,
} from "@/api/constants/keys";
import queryClient from "@/api/queryClient";
import {
  createCategory,
  deleteCategories,
  updateCategory,
} from "@/api/services/categoryService";
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

export const useUpdateCategory = () => { 
  return useMutation({
    mutationKey: [UPDATE_CATEGORY_MUTATION_KEY],
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES] });
    },
  });
}

export const useDeleteCategories = () => {
  return useMutation({
    mutationKey: [DELETE_CATEGORIES_MUTATION_KEY],
    mutationFn: deleteCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES] });
    },
  });
};
