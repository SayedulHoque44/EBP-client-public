import React from "react";

import { useGetBlogsQuery } from "../../redux/Api/BlogsManagmentApi/BlogManagmentApi";
import Bannar from "./Bannar/Bannar";
import Course from "./Course/Course";
import CourseInfo from "./CourseInfo/CourseInfo";
import DrivingLicence from "./DrivingLicence/DrivingLicence";
import FounderDetails from "./FounderDetails/FounderDetails";
import IntroVideo from "./IntroVideo/IntroVideo";
import LatestBlog from "./LatestBlog/LatestBlog";
import PinnedBlog from "./PinnedBlog/PinnedBlog";
import PublicVideo from "./PublicVideo/PublicVideo";

const Home = () => {
  const {
    data: Blog,
    isLoading,
    isFetching,
  } = useGetBlogsQuery([
    { name: "pin", value: true },
    { name: "type", value: "Congratulate" },
    { name: "limit", value: 1 },
  ]);

  return (
    <div>
      {/* Pinned Blog */}
      {Blog?.result?.length > 0 &&
        Blog?.result.map((blog) => <PinnedBlog key={blog._id} blog={blog} />)}
      {/*  */}
      <Bannar />
      <IntroVideo />
      <Course />
      <CourseInfo />
      <FounderDetails />
      {/* <Poster /> */}
      <DrivingLicence />
      <LatestBlog />
      <PublicVideo />
    </div>
  );
};

export default Home;
