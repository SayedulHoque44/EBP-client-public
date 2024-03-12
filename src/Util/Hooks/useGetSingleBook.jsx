import { useQuery } from "@tanstack/react-query";
import { patenteAxios } from "./useAxiosSecure";
import usePContext from "./usePContext";

const useGetSingleBook = (id) => {
  const { loading } = usePContext();
  const {
    data: singleBook = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["singleBook"],
    enabled: !loading,
    queryFn: async () => {
      const result = await patenteAxios.get(`/singleBook/${id}`);

      return result.data;
    },
  });

  return { singleBook, refetch, isLoading };
};

export default useGetSingleBook;
