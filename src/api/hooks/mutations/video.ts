import {
  COURSE_VIDEOS,
  CREATE_VIDEO_MUTATION_KEY,
  UPDATE_VIDEO_MUTATION_KEY,
} from "@/api/constants/keys";
import queryClient from "@/api/queryClient";
import { createVideo, updateVideo } from "@/api/services/video";
import { useMutation } from "@tanstack/react-query";

export const useCreateVideo = (course_id: string) => {
  return useMutation({
    mutationKey: [CREATE_VIDEO_MUTATION_KEY],
    mutationFn: createVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSE_VIDEOS, course_id] });
    },
  });
};
export const useUpdateVideo = (course_id: string) => {
  return useMutation({
    mutationKey: [UPDATE_VIDEO_MUTATION_KEY],
    mutationFn: updateVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSE_VIDEOS, course_id] });
    },
  });
};
