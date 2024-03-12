import { useQuery } from "@tanstack/react-query";
import { patenteAxios } from "./useAxiosSecure";

const useGetCVbyId = (videoId) => {
  const {
    data: CourseVideo = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["CourseVideo"],
    enabled: videoId ? true : false,
    queryFn: async () => {
      const result = await patenteAxios.get(`/CourseVideosSingle/${videoId}`);

      return result.data;
    },
  });

  return { CourseVideo, refetch, isLoading };
};

export default useGetCVbyId;
