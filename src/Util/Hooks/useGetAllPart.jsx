import { useQuery } from "@tanstack/react-query";
import { patenteAxios } from "./useAxiosSecure";

const useGetAllPart = () => {
  const {
    data: videParts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["videParts"],
    queryFn: async () => {
      const result = await patenteAxios.get("/AllvideParts");

      return result.data;
    },
  });

  return { videParts, refetch, isLoading };
};

export default useGetAllPart;
