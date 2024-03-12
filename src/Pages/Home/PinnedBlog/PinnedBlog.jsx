import React, { useEffect, useState } from "react";
import Container from "../../../Shared/Container/Container";
import { minimizeText } from "../../../Util/utils";
import pinnedImg from "../../../assets/Images/pin.png";

const PinnedBlog = ({ blog }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { _id, title, description, pin, createdAt, imageUrl } = blog;
  const [seeMore, setSeeMore] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const textObj = minimizeText(description, isMobile);
  //grid grid-cols-6 gap-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700
  return (
    <Container>
      <div className="grid grid-cols-6 gap-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="col-span-2   md:col-span-2 xl:col-span-2 flex items-center justify-center">
          <img className="rounded-t-lg xl:w-72 xl:h-72" src={imageUrl} alt="" />
        </div>

        <div className="p-5 col-span-4 flex flex-col justify-between md:col-span-4 xl:col-span-4">
          <div className="relative">
            {/* <TbPinnedOff
              className="absolute right-0 top-0 text-white"
              size={25}
            /> */}
            <img
              src={pinnedImg}
              alt="pinned"
              className="absolute top-0 right-0 h-6"
            />
            <a href="#">
              <h5 className="mb-4 text-md md:text-2xl font-bold tracking-tight text-white ">
                {title}
              </h5>
            </a>
            <p
              onClick={() => setSeeMore(!seeMore)}
              className="font-normal  dark:text-gray-400">
              {seeMore ? (
                <span className="text-gray-500">{description}</span>
              ) : (
                <>
                  <span className="text-gray-500">{textObj.minText}</span>
                  {textObj.minifay && (
                    <span className="text-gray-300"> See more....</span>
                  )}
                </>
              )}
            </p>
          </div>
          <div className="flex justify-end">
            <a
              href={`blogs/${_id}`}
              className=" inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              details
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PinnedBlog;
