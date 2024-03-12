import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { Timecheckers } from "../../../Util/Hooks/useFuntionality";

const OnGoingCourseTime = ({ courseDuration }) => {
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    // Calculate remaining time when the endDate and durationMonths change
    const calculateRemainingTime = () => {
      const now = moment();
      const end = moment(courseDuration.endDate);
      const timeRemaining = moment.duration(end.diff(now));
      setRemainingTime(timeRemaining);
    };

    calculateRemainingTime();

    // Update the remaining time every second (1000 milliseconds)
    const intervalId = setInterval(calculateRemainingTime, 1000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="text-center mt-4">
      {remainingTime !== null && (
        <>
          {Timecheckers(
            courseDuration.startDate,
            courseDuration.endDate,
            remainingTime
          )}
        </>
      )}
    </div>
  );
};

export default OnGoingCourseTime;
