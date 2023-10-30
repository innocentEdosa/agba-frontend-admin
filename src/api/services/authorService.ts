import http from "@/api/htttp";
import { CREATE_AUTHOR, GET_AUTHORS } from "../constants/endpoints";
import {
  Author,
  CreateAuthor,
  GetRequestParamsType,
  ResponseType,
} from "@/types";
// import { GET_AUTHOR_STATIC_PATH, GET_SINGLE_AUTHOR } from "@/api/constants/endpoints";

export const createAuthor = (params: CreateAuthor) => {
  return http.post<CreateAuthor, Author>(CREATE_AUTHOR, params);
};

export const getAuthors = ({ limit = 20, page = 1, ...params }) => {
  return http.get<GetRequestParamsType, ResponseType<Author[]>>(
    GET_AUTHORS,
    {
      params: {
        page,
        limit,
        ...params,
      },
    }
  );
};

// export const getAuthorsStaticPath = ({limit = 1000, page = 1 }) => {
//  return http.get(GET_AUTHOR_STATIC_PATH, {
//   params: {
//     page,
//     limit,
//   }
//  })
// }

// export const getSingleAuthor = (id: string) =>  {
//   return http.get(GET_SINGLE_AUTHOR, {params: {id}})
// }
