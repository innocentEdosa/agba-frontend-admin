import http from "@/api/htttp";
import {
  ARCHIVE_AUTHOR,
  CREATE_AUTHOR,
  DELETE_AUTHOR,
  GET_AUTHORS,
  UPDATE_AUTHOR,
} from "../constants/endpoints";
import {
  Author,
  CreateAuthor,
  GetRequestParamsType,
  ResponseType,
  UpdateAuthorParams,
} from "@/types";
// import { GET_AUTHOR_STATIC_PATH, GET_SINGLE_AUTHOR } from "@/api/constants/endpoints";

export const createAuthor = (params: CreateAuthor) => {
  return http.post<CreateAuthor, Author>(CREATE_AUTHOR, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAuthors = ({ limit = 20, page = 1, ...params }) => {
  return http.get<GetRequestParamsType, ResponseType<Author[]>>(GET_AUTHORS, {
    params: {
      page,
      limit,
      ...params,
    },
  });
};

export const updateAuthor = (data: UpdateAuthorParams) => {
  const { id, ...params } = data;
  return http.put<Author>(`${UPDATE_AUTHOR}/${id}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteAuthor = (id: string) => {
  return http.delete(`${DELETE_AUTHOR}/${id}`);
};

export const archiveAuthor = (id: string) => {
  return http.put(`${ARCHIVE_AUTHOR}/${id}`, {});
};
