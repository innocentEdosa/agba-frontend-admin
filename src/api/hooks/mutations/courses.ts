import {
  ARCHIVE_COURSE_MUTATION_KEY,
  COURSE_LIST,
  CREATE_COURSE_MUTATION_KEY,
  DELETE_COURSE_MUTATION_KEY,
  UPDATE_COURSE_MUTATION_KEY,
} from "@/api/constants/keys";
import queryClient from "@/api/queryClient";
import {
  archiveCourse,
  createCourse,
  deleteCourse,
  updateCourse,
} from "@/api/services/coursesService";
import { useMutation } from "@tanstack/react-query";

export const useCreateCourse = () => {
  return useMutation({
    mutationKey: [CREATE_COURSE_MUTATION_KEY],
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSE_LIST] });
    },
  });
};

export const useUpdateCourse = () => {
  return useMutation({
    mutationKey: [UPDATE_COURSE_MUTATION_KEY],
    mutationFn: updateCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSE_LIST] });
    },
  });
};

export const useDeleteCourse = () => {
  return useMutation({
    mutationKey: [DELETE_COURSE_MUTATION_KEY],
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSE_LIST] });
    },
  });
};

export const useArchiveCourse = () => {
  return useMutation({
    mutationKey: [ARCHIVE_COURSE_MUTATION_KEY],
    mutationFn: archiveCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSE_LIST] });
    },
  });
};
