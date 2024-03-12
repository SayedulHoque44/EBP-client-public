import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { GrAdd } from "react-icons/gr";
import { patenteAxios } from "../../Util/Hooks/useAxiosSecure";
import PButton from "../Components/PButton";
const AddYoutubeVideo = ({ refetch }) => {
  const [type, setType] = useState(null);
  //
  const handleAddYoutubeVideo = (e) => {
    e.preventDefault();
    //
    if (!type) {
      return toast.error("Please Select Video Type");
    }
    //
    const form = e.target;
    const title = form.title.value;
    const videoUrl = form.videoUrl.value;
    const desc = form.desc.value;
    const VideoInfo = { title, videoUrl, desc, type };
    //
    patenteAxios
      .post("/youtubeVideo", VideoInfo)
      .then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          toast.success(`${title} Added!`);
          form.reset();
          refetch();
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <>
      <div
        className="flex flex-col mt-5"
        title="Add Video"
        onClick={() => window.my_modal_3.showModal()}>
        <PButton text={<GrAdd />} className={"font-bold text-2xl"} />
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleAddYoutubeVideo}>
            <h1 className="text-center">Add Video</h1>
            <input
              type="text"
              className="p-2 border-2 border-P-primary"
              required
              name="title"
              placeholder="Title"
            />
            <input
              type="text"
              className="p-2 border-2 border-P-primary"
              required
              name="videoUrl"
              placeholder="Video Url"
            />
            <input
              type="text"
              className="p-2 border-2 border-P-primary"
              required
              name="desc"
              placeholder="Video Description"
            />
            <PButton text={"Add"} type="submit" />
            <div className="flex gap-5">
              <span
                onClick={() => setType("private")}
                className={`badge badge-outline cursor-pointer ${
                  type === "private" && "bg-P-primary"
                }`}>
                Private
              </span>
              <span
                onClick={() => setType("public")}
                className={`badge badge-outline cursor-pointer ${
                  type === "public" && "bg-P-primary"
                }`}>
                Public
              </span>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddYoutubeVideo;
