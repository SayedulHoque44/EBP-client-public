import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import ReactPlayer from "react-player";
import useFuntionality from "../../Util/Hooks/useFuntionality";
import usePContext from "../../Util/Hooks/usePContext";
const VideoSlide = ({ video, refetch }) => {
  const { title, _id, desc, videoUrl } = video;
  const { handleDeleteYVideo } = useFuntionality();
  const { loggedUser } = usePContext();

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
    <div className="overflow-hidden relative aos-init" data-aos="fade-up">
      <div className="w-full bg-P-Black">
        <ReactPlayer
          url={videoUrl}
          width={"100%"}
          controls={true}
          loop={true}
        />
      </div>
      <div className="px-3 h-full py-5 bg-[#f6f6f7] space-y-2">
        <a href={videoUrl} className="text-xl font-semibold">
          {title}
        </a>
        <p>{desc}</p>
      </div>
      {loggedUser?.role === "Admin" && (
        <MdDelete
          title="Delete Video"
          className="absolute bottom-2 right-2 text-error cursor-pointer"
          size={30}
          onClick={() => handleDeleteYVideo(video, refetch)}
        />
      )}
    </div>
  );
};

export default VideoSlide;
