import React from "react";
import ReactPlayer from "react-player";
import Container from "../../../Shared/Container/Container";

const IntroVideo = () => {
  return (
    <div className="py-20">
      <Container>
        <div className="w-full h-[500px] xl:h-[600px] lg:w-2/3 xl:1/2 mx-auto">
          <ReactPlayer
            url={"https://youtu.be/4jBnXOCdBRA?si=Z6w58ywFpaQTBAxd"}
            width={"100%"}
            // playing={true}
            loop={true}
            height={"100%"}
            style={{ border: "2px solid #8319f4", padding: "2px" }}
            controls={true}
          />
        </div>
      </Container>
    </div>
  );
};

export default IntroVideo;
