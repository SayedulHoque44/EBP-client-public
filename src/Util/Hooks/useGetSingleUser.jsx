import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import usePContext from "./usePContext";

const useGetSingleUser = (id) => {
  const { loading } = usePContext();
  const { localSecureNewAxios } = useAxiosSecure();
  const {
    data: SingleUser = [],
    refetch,
    isLoading,
    error: SingleUserError,
  } = useQuery({
    queryKey: ["User", id],
    enabled: !loading,
    queryFn: async () => {
      const response = await localSecureNewAxios.get(`/users/${id}`);
      return response.data.data;
    },
  });

  return [SingleUser, refetch, isLoading, SingleUserError];
};

export default useGetSingleUser;
