import { useQuery } from "@tanstack/react-query";
import { patenteAxios } from "./useAxiosSecure";

const useGetCVbyPartId = (partId) => {
  const {
    data: CourseVideos = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [partId],
    queryFn: async () => {
      const result = await patenteAxios.get(`/CourseVideos/${partId}`);

      return result.data;
    },
  });

  return { CourseVideos, refetch, isLoading };
};

export default useGetCVbyPartId;
