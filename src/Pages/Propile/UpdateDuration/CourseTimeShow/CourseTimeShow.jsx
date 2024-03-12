import React from "react";
import { MdHistory } from "react-icons/md";
import SingleCourseTime from "./SingleCourseTime/SingleCourseTime";

const CourseTimeShow = ({ courseTimes }) => {
  return (
    <>
      <span
        className="flex cursor-pointer items-center gap-2 bg-gray-400 text-gray-600 my-3 px-5 py-3 rounded"
        onClick={() => window.my_modal_5.showModal()}>
        <MdHistory /> Course History
      </span>
      {/* {courseTime && <SingleCourseTime small={true} courseTime={courseTime} />} */}
      {courseTimes.map((courseTimeEle) => {
        return (
          courseTimeEle.status === "ONGOING" && (
            <SingleCourseTime
              courseTime={courseTimeEle}
              key={courseTimeEle._id}
            />
          )
        );
      })}

      <dialog id="my_modal_5" className="modal  text-black">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            {courseTimes.map((courseTimeEle) => (
              <SingleCourseTime
                courseTime={courseTimeEle}
                key={courseTimeEle._id}
              />
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CourseTimeShow;
