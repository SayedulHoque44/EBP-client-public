import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import PLinkBtn from "../../../Shared/Components/PLinkBtn";
import Container from "../../../Shared/Container/Container";
import { uplodeAndGetImagUrl } from "../../../Util/Hooks/useFuntionality";
const Bannar = () => {
  uplodeAndGetImagUrl();
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
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 py-10 md:gap-0 gap-5 overflow-hidden">
        <div
          className="xl:mr-20 mr-10 flex flex-col justify-between  gap-3 aos-init"
          data-aos="fade-right">
          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight">
            Enroll Patente Course And Learn Driving!
          </h1>
          <p>
            Most Popular And Guranted Driving school is waiting for you,Start
            Your Course Today By Enrolling.
          </p>
          <div>
            <PLinkBtn link={"/"} text={"read more"} />
          </div>
        </div>
        <div className="flex justify-center">
          <figure
            className="image-overlay w-[500px] aos-init"
            data-aos="fade-left">
            <img
              className="h-full w-full "
              draggable="false"
              src="https://i.ibb.co/SRk5bKp/banner-img-1.jpg"
              alt=""
            />
          </figure>
        </div>
      </div>
    </Container>
  );
};

export default Bannar;
