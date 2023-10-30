import axios, { AxiosRequestConfig } from "axios";
import ResponseError from "./ResponseError";
import ConnectionError from "./ConnectionError";
import ls from "@/utils/localStorage";
import lsKeys from "@/constants/lsKeys";

export interface Transformer<In, Out> {
  (data: In): Out;
}

export default async function customRequest<T, R = T>(
  path: string,
  options?: AxiosRequestConfig,
  transform?: Transformer<T, R>
): Promise<R> {
  try {
    const res = await axios(path, options);

    if (transform) {
      return transform(await res.data);
    }

    return res.data;
  } catch (err) {
    if (!axios.isAxiosError(err)) throw err;
if(err?.response?.status == 401) {
  ls.remove(lsKeys.auth)
}
    if (err.response) {
      // @ts-ignore
      if (err?.response?.data?.errors?.length) {
        // @ts-ignore
        const errorObj = err?.response?.data?.errors?.reduce((acc, now) => {
          return {
            ...acc,
            [now.field]: now?.message,
          };
        }, {});
        throw errorObj;
      }
      // @ts-ignore
      throw new ResponseError(err.response?.data?.message || err?.response?.data, err.response.status);
    }

    throw new ConnectionError();
  }
}
