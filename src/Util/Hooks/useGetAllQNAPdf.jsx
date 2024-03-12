import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetAllQNAPdf = () => {
  const { localNewAxios, localSecureNewAxios } = useAxiosSecure();
  const {
    data: AllQNAPdf = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["pdf"],
    queryFn: async () => {
      const result = await localSecureNewAxios.get("/QNAPdf");

      return result.data;
    },
  });

  return { AllQNAPdf, refetch, isLoading };
};

export default useGetAllQNAPdf;
