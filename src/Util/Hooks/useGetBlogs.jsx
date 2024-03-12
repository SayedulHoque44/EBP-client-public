import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetBlogs = (queryParams) => {
  const { localNewAxios } = useAxiosSecure();
  const {
    data: Blogs = [],
    refetch,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      let queryString = "/blogs?";
      if (queryParams && queryParams.length > 0) {
        // Construct the query string based on the provided parameters
        queryParams.forEach((param) => {
          queryString += `&${param.name}=${param.value}`;
        });
      }

      const result = await localNewAxios.get(queryString);

      return result?.data;
    },
  });

  return { Blogs, refetch, isLoading, isFetching };
};

export default useGetBlogs;
