import { RegisterParamsType, LoginParamsType } from "@/types";
import http from "@/api/htttp";
import {
  GET_ME_URL,
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_USER,
} from "@/api/constants/endpoints";

export const register = (params: RegisterParamsType) =>
  http.post(REGISTER_URL, params, {});

export const login = (
  params: LoginParamsType
): Promise<{ token: { token: string; expires_at: string } }> =>
  http.post(LOGIN_URL, params, {});

export const getMe = () => http.get(GET_ME_URL);

export const logout = () => http.post(LOGOUT_USER, {}, {});
