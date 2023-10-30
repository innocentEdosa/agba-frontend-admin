import { COURSE, COURSE_LIST } from "@/api/constants/keys";
import { getCourseBySlug, getCourses } from "@/api/services/coursesService";
import { GetRequestParamsType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetCourses = (params: GetRequestParamsType) => {
  return useQuery({
    queryKey: [COURSE_LIST, params],
    queryFn: () => getCourses(params),
  });
};

export const useGetCourseBySlug = (slug: string) => {
  return useQuery({
    queryKey: [COURSE, slug],
    queryFn: () => getCourseBySlug(slug),
  });
};
