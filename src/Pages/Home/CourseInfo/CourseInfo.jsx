import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Container from "../../../Shared/Container/Container";

const CourseInfo = () => {
  const liItems = [
    "২৫ টি অধ্যায়ের লাইভ জুম ক্লাস প্রধান করা হয়।",
    "কুইজ অ্যাপস।",
    "ক্লাসের রেকর্ড ভিডিও প্রদান করা হয়।",
    "ইতালিয়ান শব্দের বাংলা অর্থ (PDF)।",
    "জটিল কুইজ এর বাংলা টিপস এন্ড ট্রিকস।",
    "১ বছরের জন্য আনলিমিটেড ক্লাস এর সুবিধা প্রদান করা হবে।",
    "পাতেন্তের বই (PDF)।",
  ];

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
    <div className="py-10" id="Assets">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div className="overflow-hidden">
            <img
              className="mx-auto aos-init"
              src="https://i.ibb.co/hKmzyJs/image-7.jpg"
              alt=""
              data-aos="fade-up-left"
            />
          </div>
          <div className="space-y-5 overflow-hidden">
            <div className="small-title">Assets</div>
            <h2 className="text-3xl mr-10">
              আমাদের প্রাইভেট কোর্স এ যা যা থাকচেঃ
            </h2>
            <ul data-aos="fade-up-right" className="aos-init">
              {liItems.map((item, index) => (
                <li className="flex items-center gap-2 mb-2" key={index}>
                  <BsFillArrowRightCircleFill color="green" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CourseInfo;
