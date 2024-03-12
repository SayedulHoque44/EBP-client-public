import moment from "moment-timezone";
import React, { useEffect } from "react";

const UpComingCourseTime = ({ courseDuration }) => {
  const courseStartTime = new Date(courseDuration.startDate).getTime();
  const courseEndTime = new Date(courseDuration.endDate).getTime();
  const currentTime = new Date().getTime();

  useEffect(() => {
    const checkCourseTimeStarted = () => {
      if (
        new Date(courseDuration.startDate).getTime() <= new Date().getTime()
      ) {
        window.location.href = "/dashboard";
      }
    };
    const intervalId = setInterval(checkCourseTimeStarted, 1000);
    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="text-center mt-4">
      <p className="text-2xl counterAlart p-2 rounded-md inline-block mx-auto text-warning">
        Your Course Will Be Start in (
        {moment(courseStartTime).local().format("D MMMM, h:mm A YYYY")})
      </p>
    </div>
  );
};

export default UpComingCourseTime;
