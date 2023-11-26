import {
  ARCHIVE_VIDEO_MUTATION_KEY,
  COURSE_VIDEOS,
  CREATE_VIDEO_MUTATION_KEY,
  DELETE_VIDEO_MUTATION_KEY,
  UPDATE_VIDEO_MUTATION_KEY,
} from "@/api/constants/keys";
import queryClient from "@/api/queryClient";
import {
  archiveVideo,
  createVideo,
  deleteVideo,
  updateVideo,
} from "@/api/services/video";
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

export const useDeleteVideo = (course_id: string) => {
  return useMutation({
    mutationKey: [DELETE_VIDEO_MUTATION_KEY],
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSE_VIDEOS, course_id] });
    },
  });
};

export const useArchiveVideo = (course_id: string) => {
  return useMutation({
    mutationKey: [ARCHIVE_VIDEO_MUTATION_KEY],
    mutationFn: archiveVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSE_VIDEOS, course_id] });
    },
  });
};
