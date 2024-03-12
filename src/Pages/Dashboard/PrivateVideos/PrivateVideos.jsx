import React from "react";
import Container from "../../../Shared/Container/Container";
import Videos from "../../../Shared/Videos/Videos";

const PrivateVideos = () => {
  return (
    <div className="py-10">
      <Container>
        <h1 className="text-center text-3xl md:text-4xl my-5">All Videos</h1>
        <Videos type={"private"} />
      </Container>
    </div>
  );
};

export default PrivateVideos;
