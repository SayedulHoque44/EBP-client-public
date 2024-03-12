import moment from "moment-timezone";
import React from "react";

const EndedCourseTime = ({ courseDuration }) => {
  return (
    <div className="text-center mt-4">
      <p className="text-2xl counterAlart  p-2 rounded-md inline-block mx-auto text-red-500">
        Your Course Ended in (
        {moment(courseDuration.endDate).local().format("MMMM D, YYYY")})
      </p>
    </div>
  );
};

export default EndedCourseTime;
