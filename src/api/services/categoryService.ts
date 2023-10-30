import http from "@/api/htttp";
import {
  CategoriesType,
  CreateCategoryParam,
  GetCategoriesResponseType,
  GetRequestParamsType,
} from "@/types";
import { CREATE_CATEGORY, GET_CATEGORIES } from "../constants/endpoints";

export const createCategory = (data: CreateCategoryParam) => {
  return http.post<CreateCategoryParam, CategoriesType>(CREATE_CATEGORY, data);
};

export const getCategories = (params?: GetRequestParamsType) => {
  const transformRes = (data: any) => {
    return data?.data;
  };
  return http.get<GetRequestParamsType, GetCategoriesResponseType>(
    GET_CATEGORIES,
    params,
    transformRes
  );
};
