import { useQuery } from "@tanstack/react-query";
import { patenteAxios } from "./useAxiosSecure";

const useGetAllDeviceByUserId = (userId) => {
  const {
    data: userAllDevice = [],
    refetch: DeviceRefetch,
    isLoading,
  } = useQuery({
    queryKey: ["devices", userId],
    enabled: userId ? true : false,
    queryFn: async () => {
      const result = await patenteAxios.get(`/DeviceUsers/${userId}`);

      return result.data;
    },
  });

  return { userAllDevice, DeviceRefetch, isLoading };
};

export default useGetAllDeviceByUserId;
