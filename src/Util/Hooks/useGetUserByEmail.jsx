import { useQuery } from "@tanstack/react-query";
import { patenteAxios } from "./useAxiosSecure";
import usePContext from "./usePContext";

const useGetUserByEmail = (email) => {
  const { loading, user } = usePContext();
  const {
    data: SingleUser = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["UserEmail", email],
    enabled: !loading,
    queryFn: async () => {
      const response = await patenteAxios.get(`/useremail/${email}`);
      return response.data;
    },
  });

  return [SingleUser, refetch, isLoading];
};

export default useGetUserByEmail;
