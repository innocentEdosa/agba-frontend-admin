import { GetRequestParamsType, ResponseType, UserType } from "@/types";
import { GET_USERS, GEt_USERS_COUNT } from "../constants/endpoints";
import htttp from "../htttp";

export const getUsers = async (params: GetRequestParamsType) => {
  return await htttp.get<GetRequestParamsType, ResponseType<UserType[]>>(
    GET_USERS,
    { params: { ...params } }
  );
};

export const getUsersCount = async () => {
  return await htttp.get<{ count: number }>(GEt_USERS_COUNT);
};
