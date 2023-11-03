import http from "@/api/htttp";
import {
  CategoriesType,
  CreateCategoryParam,
  GetCategoriesResponseType,
  GetRequestParamsType,
  UpdateCategoryParam,
} from "@/types";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORIES,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
} from "../constants/endpoints";

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

export const updateCategory = (data: UpdateCategoryParam) => {
  const { id, ...rest } = data;
  return http.put<UpdateCategoryParam, CategoriesType>(
    `${UPDATE_CATEGORY}/${id}`,
    { ...rest }
  );
};

export const deleteCategories = (categoryIds: string[]) => {
  return http.delete(DELETE_CATEGORIES, { categoryIds });
};
