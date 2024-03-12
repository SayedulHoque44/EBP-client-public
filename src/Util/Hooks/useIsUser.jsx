import { useQuery } from "@tanstack/react-query";
import { patenteAxios } from "./useAxiosSecure";
import usePContext from "./usePContext";

const useIsUser = () => {
  const { loading, user } = usePContext();
  const {
    data: isUser = "",
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["UserEmail", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await patenteAxios.get(`/useremail/${user?.email}`);
      return response.data;
    },
  });

  return { isUser, refetch, isLoading };
};

export default useIsUser;
