import React from "react";
import LoaderCircleWithBar from "../../Shared/Components/LoaderCircleWithBar";
import Container from "../../Shared/Container/Container";
import { useGetBlogsQuery } from "../../redux/Api/BlogsManagmentApi/BlogManagmentApi";
import BlogContainer from "./BlogContainer/BlogContainer";

const BlogSection = () => {
  const {
    data: Blogs,
    isLoading,
    isFetching,
  } = useGetBlogsQuery([{ name: "sort", value: "-createdAt" }]);

  return (
    <Container>
      <h1 className="font-semibold text-2xl my-5">/Blogs</h1>

      {/* <FileUpload /> */}

      <div className="py-10 space-y-10 bg-P-gry flex flex-col items-center rounded">
        {/* loading */}
        {isLoading && <LoaderCircleWithBar />}
        {/* <BlogSkeletonLoader /> */}
        {/* success and length > 0  */}
        {Blogs?.result.length > 0 &&
          Blogs?.result.map((blog) => (
            <BlogContainer key={blog._id} blog={blog} />
          ))}
        {/* if empty */}
        {Blogs?.result.length === 0 && (
          <h1 className="text-error p-3 text-center">Empty!</h1>
        )}
      </div>
    </Container>
  );
};

export default BlogSection;
