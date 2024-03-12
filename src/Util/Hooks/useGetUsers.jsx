import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import usePContext from "./usePContext";

const useGetUsers = () => {
  const { loading } = usePContext();
  const { localNewAxios, localSecureNewAxios } = useAxiosSecure();
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["Users"],
    enabled: !loading,
    queryFn: async () => {
      const response = await localSecureNewAxios.get(`/users`);
      return response.data.data;
    },
  });

  return [users, refetch, isLoading];
};

export default useGetUsers;

// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";
// import usePContext from "./usePContext";

// const useGetUsers = () => {
//   const { loading } = usePContext();
//   const { localSecureNewAxios } = useAxiosSecure();
//   const {
//     data: users = [],
//     refetch,
//     isLoading,
//   } = useQuery({
//     queryKey: ["Users"],
//     enabled: !loading,
//     queryFn: async () => {
//       const response = await localSecureNewAxios.get(`/users`);
//       return response.data.data;
//     },
//   });

//   return [users, refetch, isLoading];
// };

// export default useGetUsers;
