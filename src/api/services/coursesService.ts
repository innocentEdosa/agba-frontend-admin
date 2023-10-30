import http from "@/api/htttp";
import {
  GetRequestParamsType,
  Course,
  CreateCourseType,
  CourseResponseType,
} from "@/types";
import {
  CREATE_COURSE,
  GET_COURSE_BY_SLUG,
  GET_cOURSES,
} from "@/api/constants/endpoints";

export const createCourse = (params: CreateCourseType) => {
  return http.post<CreateCourseType, Course>(CREATE_COURSE, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getCourses = (params: GetRequestParamsType) => {
  return http.get<GetRequestParamsType, CourseResponseType>(GET_cOURSES, {
    params,
  });
};

export const getCourseBySlug = (slug: string) => {
  return http.get<{ params: { slug: string } }, Course>(GET_COURSE_BY_SLUG, {
    params: { slug },
  });
};
