import queryClient from '../queryClient';

export default function refetchTokens(queryKey: any) {
  return () => queryClient.invalidateQueries(queryKey);
}