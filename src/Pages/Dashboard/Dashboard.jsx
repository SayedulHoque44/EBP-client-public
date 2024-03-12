import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Container from "../../Shared/Container/Container";
import usePContext from "../../Util/Hooks/usePContext";
import { useGetSingleUserQuery } from "../../redux/Api/UserManagmentApi/UserManagmentApi";
import Congratulation from "./Congratulation/Congratulation";
import DashboradContent from "./DashboradContent/DashboradContent";
import EndedCourseTime from "./EndedCourseTime/EndedCourseTime";
import OnGoingCourseTime from "./OnGoingCourseTime/OnGoingCourseTime";
import UpComingCourseTime from "./UpComingCourseTime/UpComingCourseTime";

const Dashboard = () => {
  const { loggedUser } = usePContext();
  // const [SingleUser, refetch, isLoading, SingleUserError] = useGetSingleUser(
  //   loggedUser._id
  // );
  const { data: SingleUser } = useGetSingleUserQuery(loggedUser._id);

  const location = useLocation();

  // is user blocked courseTime
  if (SingleUser?.status === "Block") {
    window.location.href = "/dashboard";
  }
  // is there any onGoing course
  const isThereAnyOnGoingCourse = SingleUser?.courseTimes?.find(
    (courseTimeEle) => courseTimeEle.status === "ONGOING"
  );
  // is there any onGoing course
  const isThereEndedCourse = SingleUser?.courseTimes?.find(
    (courseTimeEle) => courseTimeEle.status === "ENDED"
  );
  // is there any onGoing course
  const isThereUpcoming = SingleUser?.courseTimes?.find(
    (courseTimeEle) => courseTimeEle.status === "UPCOMING"
  );
  // if ther user is not admin and is active --> now is  ongoing course is finished and still user is not active.
  if (SingleUser?.role !== "Admin" && SingleUser?.status === "Active") {
    if (!isThereAnyOnGoingCourse) {
      window.location.href = "/dashboard";
    }
  } else if (
    SingleUser?.role !== "Admin" &&
    SingleUser?.status === "Disabled"
  ) {
    // if ther user is not admin and is disabled -> now is any ongoing course updated for this user and user still disabled
    if (isThereAnyOnGoingCourse) {
      window.location.href = "/dashboard";
    }
  }
  return (
    <Container>
      <h1 className="text-2xl text-center mt-5">
        <span className="text-4xl">W</span>elcome{" "}
        <span className="text-P-primary">{loggedUser.name} </span>
      </h1>
      {/* show course infromation */}
      {loggedUser.role !== "Admin" && SingleUser?.status !== "Passed" && (
        <>
          {isThereAnyOnGoingCourse ? (
            <OnGoingCourseTime courseDuration={isThereAnyOnGoingCourse} />
          ) : isThereUpcoming ? (
            <UpComingCourseTime courseDuration={isThereUpcoming} />
          ) : isThereEndedCourse ? (
            <EndedCourseTime courseDuration={isThereEndedCourse} />
          ) : (
            ""
          )}
        </>
      )}
      {/* congratulation */}
      {SingleUser?.status === "Passed" && <Congratulation />}
      {/* DashBorad Content */}
      {SingleUser && location.pathname === "/dashboard" && (
        <DashboradContent user={SingleUser} />
      )}
      <Outlet />
    </Container>
  );
};

export default Dashboard;
