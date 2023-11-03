import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

const useQueryParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams!);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const addQueryParam = useCallback(
    (name: string, value: string) => {
      const queryparam = createQueryString(name, value);
      router.push(pathname + "?" + queryparam);
    },
    [createQueryString]
  );

  const getQueryParam = useCallback(
    (key: string) => {
      return searchParams?.get(key);
    },
    [searchParams]
  );

  return {
    addQueryParam,
    createQueryString,
    getQueryParam,
  };
};

export default useQueryParams;
