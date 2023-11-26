import {
  ARCHIVE_AUTHOR_MUTATION_KEY,
  AUTHOR_LIST,
  CREATE_AUTHOR_MUTATION_KEY,
  DELETE_AUTHOR_MUTATION_KEY,
  UPDATE_AUTHOR_MUTATION_KEY,
} from "@/api/constants/keys";
import optimisticUpdate from "@/api/helpers/optimisticUpdate";
import queryClient from "@/api/queryClient";
import {
  archiveAuthor,
  createAuthor,
  deleteAuthor,
  updateAuthor,
} from "@/api/services/authorService";
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

export const useDeleteAuthor = () => {
  return useMutation({
    mutationKey: [DELETE_AUTHOR_MUTATION_KEY],
    mutationFn: deleteAuthor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AUTHOR_LIST] });
    },
  });
};

export const useArchiveAuthor = () => {
  return useMutation({
    mutationKey: [ARCHIVE_AUTHOR_MUTATION_KEY],
    mutationFn: archiveAuthor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AUTHOR_LIST] });
    },
  });
};
