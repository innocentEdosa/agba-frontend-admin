import { QueryKey } from "@tanstack/react-query";
import queryClient from "../queryClient";
import ResponseError from "./ResponseError";

const optimisticUpdate =
  (client: typeof queryClient) =>
  <MutateData, DataType>(
    queryKey: QueryKey,
    updater: (old: DataType | null, newValue: MutateData) => DataType
  ) => ({
    onMutate: async (newValue: MutateData) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await client.cancelQueries({ queryKey });
      // Snapshot the previous value
      const prevData = client.getQueryData<DataType>(queryKey) as DataType;
      // Optimistically update to the new value
      client.setQueryData<DataType>(queryKey, (old) =>
        updater(old || null, newValue)
      );
      // Return a context object with the snapshotted value
      return { prevData };
    },
    onError: (
      _: ResponseError,
      __: MutateData,
      context?: { prevData: DataType }
    ) => {
      client.setQueryData(queryKey, context?.prevData);
    },
    onSettled: () => client.invalidateQueries({ queryKey }),
  });

export default optimisticUpdate;
