import { useQuery } from "@tanstack/react-query";
import { patenteAxios } from "./useAxiosSecure";

const useGetAllBooks = () => {
  const {
    data: Books = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const result = await patenteAxios.get("/AllBooks");

      return result.data;
    },
  });

  return { Books, refetch, isLoading };
};

export default useGetAllBooks;
