import React from "react";
import { useParams } from "react-router-dom";
import LoaderCircleWithBar from "../../../Shared/Components/LoaderCircleWithBar";
import Container from "../../../Shared/Container/Container";
import { useGetSingleBlogQuery } from "../../../redux/Api/BlogsManagmentApi/BlogManagmentApi";
import SingleBlog from "./SingleBlog";

const SingleBlogContainer = () => {
  const { blogId } = useParams();
  const { data: result, isLoading } = useGetSingleBlogQuery(blogId);

  // console.log(result);
  return (
    <Container>
      <div className="p-1 sm:p-10  bg-P-gry rounded ">
        {isLoading && <LoaderCircleWithBar />}
        {result?.data && !isLoading && <SingleBlog blogData={result?.data} />}
      </div>
    </Container>
  );
};

export default SingleBlogContainer;
