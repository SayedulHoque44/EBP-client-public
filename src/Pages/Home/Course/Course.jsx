import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import CTA from "../../../Shared/Components/CTA";
import Container from "../../../Shared/Container/Container";
const Course = () => {
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
    <div className="py-10" id="Course">
      <Container>
        <h1 className=" text-3xl md:text-4xl my-5">
          Course to drive with confidence
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 py-5">
          <div className="flex items-center justify-center border-P-gry border-l-2">
            <figure
              className="image-overlay w-[400px] aos-init"
              data-aos="fade-up">
              <img
                className="h-full w-full "
                src="https://i.ibb.co/g3qWVbm/course-1-1-485x343.jpg"
                alt=""
              />
            </figure>
          </div>
          <div className=" border-P-gry border-x-2 px-5 overflow-hidden">
            <div className="aos-init" data-aos="fade-up">
              <div className="small-title">Our Course</div>
              <div className="space-y-5">
                <h2 className="text-3xl mr-10">Standard Driving Course</h2>
                <p className="text-P-gry">
                  Nor again is there anyone who loves or pursues or desires to{" "}
                  <br />
                  obtain pain of itself, because it is pain, but because <br />
                  occasionally circumstances occur in which toil pain
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-0">
                  <div className="flex gap-3">
                    <img
                      src="https://fastwpdemo.com/newwp/udrive/wp-content/uploads/2022/06/icon-6.png"
                      alt=""
                    />
                    <div>
                      <h2>THEORY SESSION</h2>
                      <p className="text-P-gry">150 Hours</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <img
                      src="https://fastwpdemo.com/newwp/udrive/wp-content/uploads/2022/06/icon-7.png"
                      alt=""
                    />
                    <div>
                      <h2>PRACTICAL SESSION</h2>
                      <p className="text-P-gry">06 Hours</p>
                    </div>
                  </div>
                </div>
                <CTA phone={`+39 320 608 8871`} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Course;
