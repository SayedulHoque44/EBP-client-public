import Aos from "aos";
import React, { useEffect } from "react";
import HeadingStyle from "../../../Shared/Components/HeadingStyle/HeadingStyle";
import Container from "../../../Shared/Container/Container";
import Videos from "../../../Shared/Videos/Videos";

const PublicVideo = () => {
  // console.log(SingleUser);

  //
  useEffect(() => {
    Aos.init();
    Aos.refresh(); // Call AOS.refresh() after initialization

    return () => {
      Aos.refresh({
        // Optionally, you can pass options to AOS.refresh() within the cleanup function
        debounceDelay: 50,
        throttleDelay: 99,
      });
    };
  }, []);
  return (
    <div className="py-20" id="videos">
      <Container>
        <HeadingStyle text={"Our student success story and feedback!"} />
        {/* <h2 className="text-3xl my-10 text-center">
        Our student success story and feedback!
        </h2> */}
        <Videos type={"public"} />
      </Container>
    </div>
  );
};

export default PublicVideo;
