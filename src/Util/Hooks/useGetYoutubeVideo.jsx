import { useQuery } from "@tanstack/react-query";
import { patenteAxios } from "./useAxiosSecure";

const useGetYoutubeVideo = () => {
  const {
    data: YVideos = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const result = await patenteAxios.get("/youtubeVideo");

      return result.data;
    },
  });

  return { YVideos, refetch, isLoading };
};

export default useGetYoutubeVideo;
