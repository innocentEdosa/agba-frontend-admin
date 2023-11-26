import http from "@/api/htttp";
import {
  GetRequestParamsType,
  Course,
  CreateCourseType,
  CourseResponseType,
  UpdateCourseParamsType,
} from "@/types";
import {
  ARCHIVE_COURSE,
  CREATE_COURSE,
  DELETE_COURSE,
  GET_COURSE_BY_SLUG,
  GET_cOURSES,
  UPDATE_COURSE,
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
    params: { ...params },
  });
};

export const getCourseBySlug = (slug: string) => {
  return http.get<{ params: { slug: string } }, Course>(GET_COURSE_BY_SLUG, {
    params: { slug },
  });
};

export const updateCourse = (data: UpdateCourseParamsType) => {
  const { id, ...params } = data;
  return http.put<Course>(`${UPDATE_COURSE}/${id}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteCourse = (id: string) => {
  return http.delete(`${DELETE_COURSE}/${id}`);
};

export const archiveCourse = (id: string) => {
  return http.put(`${ARCHIVE_COURSE}/${id}`, {});
};
