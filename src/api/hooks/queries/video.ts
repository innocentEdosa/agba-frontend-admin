import { COURSE_VIDEOS } from "@/api/constants/keys";
import { GEtCourseVideos } from "@/api/services/video";
import { GetCourseVideosParams } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetCourseVideos = (params: GetCourseVideosParams) => {
  return useQuery({
    queryKey: [COURSE_VIDEOS, params.id, params],
    queryFn: () => GEtCourseVideos(params),
    enabled: !!params.id
  });
};
