import { COURSE_LIST, CREATE_COURSE_MUTATION_KEY } from "@/api/constants/keys";
import queryClient from "@/api/queryClient";
import { createCourse } from "@/api/services/coursesService";
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
