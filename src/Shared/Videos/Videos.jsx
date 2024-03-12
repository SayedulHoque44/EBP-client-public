import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import useGetYoutubeVideo from "../../Util/Hooks/useGetYoutubeVideo";
import usePContext from "../../Util/Hooks/usePContext";
import AddYoutubeVideo from "./AddYoutubeVideo";
import VideoSlide from "./VideoSlide";

//
const Videos = ({ type }) => {
  const { YVideos, refetch } = useGetYoutubeVideo();
  const { loggedUser } = usePContext();
  // console.log(SingleUser);

  //
  useEffect(() => {
    Aos.init();
    Aos.refresh(); // Call AOS.refresh() after initialization

    return () => {
      Aos.refresh({
        // Optionally, you can pass options to AOS.refresh() within the cleanup function
        debounceDelay: 50,
        throttleDelay: 99,
      });
    };
  }, []);
  return (
    <>
      {loggedUser?.role === "Admin" && <AddYoutubeVideo refetch={refetch} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {YVideos?.map(
          (video) =>
            video.type === type && (
              <VideoSlide video={video} key={video._id} refetch={refetch} />
            )
        )}
      </div>
    </>
  );
};

export default Videos;
