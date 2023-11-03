import {
  AUTHOR_LIST,
  CREATE_AUTHOR_MUTATION_KEY,
  UPDATE_AUTHOR_MUTATION_KEY,
} from "@/api/constants/keys";
import optimisticUpdate from "@/api/helpers/optimisticUpdate";
import queryClient from "@/api/queryClient";
import { createAuthor, updateAuthor } from "@/api/services/authorService";
import { useMutation } from "@tanstack/react-query";

export const useCreateAuthor = () => {
  return useMutation({
    mutationKey: [CREATE_AUTHOR_MUTATION_KEY],
    mutationFn: createAuthor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AUTHOR_LIST] });
    },
  });
};

export const useUpdateAuthor = () => {
  return useMutation({
    mutationKey: [UPDATE_AUTHOR_MUTATION_KEY],
    mutationFn: updateAuthor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AUTHOR_LIST] });
    },
  });
};
