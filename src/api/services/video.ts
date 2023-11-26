import {
  CreateVideoDetailsParams,
  GetCourseVideosParams,
  ResponseType,
  UpdateVideoParams,
  Video,
} from "@/types";
import {
  ARCHIVE_VIDEO,
  CREATE_VIDEO,
  DELETE_VIDEO,
  GET_COURSE_VIDEOS,
  UPDATE_VIDEO,
} from "../constants/endpoints";
import http from "../htttp";

export const createVideo = (params: CreateVideoDetailsParams) => {
  return http.post<UpdateVideoParams, Video>(CREATE_VIDEO, params, {});
};

export const updateVideo = (data: UpdateVideoParams) => {
  const { id, ...params } = data;
  return http.put<UpdateVideoParams, Video>(`${UPDATE_VIDEO}/${id}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const GEtCourseVideos = (params: GetCourseVideosParams) => {
  return http.get<GetCourseVideosParams, ResponseType<Video[]>>(
    GET_COURSE_VIDEOS,
    { params }
  );
};

export const deleteVideo = (id: string) => {
  return http.delete(`${DELETE_VIDEO}/${id}`);
};

export const archiveVideo = (id: string) => {
  return http.put(`${ARCHIVE_VIDEO}/${id}`, {});
};
