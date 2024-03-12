import { Divider } from "antd";
import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { BiLogoFacebook, BiLogoWhatsapp, BiLogoYoutube } from "react-icons/bi";
import CTA from "../../../Shared/Components/CTA";
import Container from "../../../Shared/Container/Container";
import founder from "../../../assets/Images/founder.jpg";
const FounderDetails = () => {
  const socialLinks = [
    {
      link: "https://www.facebook.com/easybanglapatente2021",
      icon: <BiLogoFacebook />,
    },
    {
      link: "https://www.youtube.com/@EasyBanglaPatente",
      icon: <BiLogoYoutube />,
    },
    {
      link: "tel:+39 389 961 1153 ",
      icon: <BiLogoWhatsapp />,
    },
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
    <Container>
      <div className="md:flex py-10" id="Instructor">
        <div className=" md:w-2/3">
          <Divider orientation="left">
            <h2 className="text-3xl my-10">
              A perfect driving school with <br /> proffesional Instructor
            </h2>
          </Divider>

          <div className="grid grid-cols-1 xl:grid-cols-2">
            <div className="hidden xl:flex justify-center ">
              <figure className="image-overlay2 w-[300px]">
                <img
                  className="h-full w-full hidden md:inline"
                  src="https://i.ibb.co/2ckfJGY/about-1.jpg"
                  alt=""
                />
              </figure>
            </div>
            <div className="lg:px-5">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="small-title uppercase">Since</div>
                  <h2 className="text-3xl mb-3">2021</h2>
                </div>
                <p className="mb-5 mr-2 lg:mr-0 leading-relaxed">
                  আসসালামু আলাইকুম ইজি বাংলা পাতেন্তে তে সবাইকে স্বাগতম। আমি
                  নাজমুল ইসলাম, ইতালীর মানতোভা শহর থেকে।{" "}
                  <a className="text-black" href="/adsView">
                    ২০২১
                  </a>{" "}
                  সালে যখন পুরো বিশ্ব তে করোনা মহামারী রোগ ছড়িয়েছিল মানুষের
                  করোনা ভাইরাসে আতঙ্ক ছিল তখন আমরা ঘরে বসে উদ্যোগ নেই কিভাবে
                  সহজে ইতালীয়ান ড্রাইভিং লাইসেন্সর থিউরি অতি সহজে ঘরে বসে শিখতে
                  পারি অনলাইন ড্রাইভিং স্কুলের মাধ্যমে। যাতে আমরা ঘরে বসে তাদের
                  অবসর সময় টিকে কাজে লাগাতে পারি এবং নতুন নতুন  জিনিসগুলো
                  শিখাইতে পারি। আলহামদুলিল্লাহ ইজি বাংলা পাতেনতে শুরুর পর থেকে
                  ইতালির বিভিন্ন শহরে আমাদের স্টুডেন্টরা অতি সহজে এবং অল্প সময়
                  থিওরি কোর্স করে ইতালিয়ান ড্রাইভিং লাইসেন্স হাতে পেয়েছে।
                  এখানে আমরা খুব সহজে কুইজের, প্রশ্নের এবং ভিডিওর মাধ্যমে
                  স্টুডেন্টদেরকে শিখিয়ে থাকি। এর ফলে মানুষ খুব তাড়াতাড়ি নিজের
                  কাঙ্ক্ষিত লক্ষে চলে যেতে পারে। আশা করি আপনারাও ইজি বাংলা
                  পাতেন্তে থেকে নিজেদের স্বপ্নগুলো পূরণ করতে পারবেন।
                </p>
                <CTA phone={`+39 389 961 1153 `} />
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/3 flex justify-center md:mt-0 mt-2 items-center">
          <div className="w-[250px]  xl:w-[300px] ">
            <figure
              className="image-overlay2 w-[250px]  xl:w-[300px] aos-init"
              data-aos="zoom-in-left">
              <img className="h-full w-full" src={founder} alt="" />
            </figure>
            <h2 className="text-xl mt-3">Nazmul Islam</h2>
            <p className="text-lg text-P-gry mb-3">Founder</p>
            <div className="flex gap-3">
              {socialLinks.map((item, index) => (
                <a
                  href={item.link}
                  key={index}
                  className="text-2xl hover:bg-P-primary h-14 w-14 rounded-full flex items-center justify-center text-white bg-P-Black">
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FounderDetails;
