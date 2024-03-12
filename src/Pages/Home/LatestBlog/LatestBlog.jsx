import React from "react";
import Container from "../../../Shared/Container/Container";

import { Button } from "antd";
import HeadingStyle from "../../../Shared/Components/HeadingStyle/HeadingStyle";
import { useGetBlogsQuery } from "../../../redux/Api/BlogsManagmentApi/BlogManagmentApi";
import BlogContainer from "../../Blog/BlogContainer/BlogContainer";

const LatestBlog = () => {
  const {
    data: Blogs,
    isLoading,
    isFetching,
  } = useGetBlogsQuery([
    { name: "sort", value: "-createdAt" },
    { name: "type", value: "Blog" },
    { name: "limit", value: 3 },
  ]);

  // console.log(Blogs);
  return (
    <div className="py-10" id="DL">
      <Container>
        <HeadingStyle text={"Our Latest Blog"} />
        {/* <h1 className="text-center text-3xl md:text-4xl my-5">
          Our Latest Blog
        </h1> */}
        <div className="flex flex-wrap gap-3">
          {Blogs?.result.length > 0 &&
            Blogs?.result.map((blog) => (
              <BlogContainer key={blog._id} blog={blog} />
            ))}
        </div>

        <a href="/blogs" className="flex justify-center my-5">
          <Button
            color="geekblue"
            className="bg-blue-500"
            type="primary"
            size="large">
            See More Blog .....
          </Button>
        </a>
      </Container>
    </div>
  );
};

export default LatestBlog;
