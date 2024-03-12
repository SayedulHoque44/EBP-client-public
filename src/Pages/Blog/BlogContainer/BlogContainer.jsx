import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { SlShareAlt } from "react-icons/sl";
import { minimizeText } from "../../../Util/utils";

/*
//TODO
1. Like only possiable if its a logged user {userId:.. like:true}/{userId:...,like:false}
2. Comment also only for logged user {userId:...,comment:"string"}

 */

const BlogContainer = ({ blog }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [seeMore, setSeeMore] = useState(false);
  const { _id, title, description, pin, createdAt, imageUrl } = blog;

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
    <div className=" md:w-[576px]  border flex flex-col justify-between rounded-lg shadow bg-gray-800 border-gray-700">
      <div className="flex items-center flex-1 ">
        {imageUrl && <img className="rounded-t-lg " src={imageUrl} alt="" />}
      </div>

      <div className="p-5 space-y-5 ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>

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
        <h2 className="text-gray-300">
          Posted On :{" "}
          <span className="text-P-primary">
            {moment(createdAt).local().format("D MMM, YYYY hh:mm A")}
          </span>
        </h2>
        <a
          href={`blogs/${_id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Read more
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
        <div className="grid grid-cols-3 border-y-2 border-gray-400 ">
          <div className="text-gray-400 text-center p-5 flex gap-1 items-center justify-center">
            {" "}
            <AiOutlineLike size={25} /> Like
          </div>
          <div className="text-gray-400 text-center p-5 flex gap-1 items-center justify-center ">
            <FaComments size={25} /> Comment
          </div>
          <div className="text-gray-400 text-center p-5 flex gap-1 items-center justify-center ">
            <SlShareAlt size={25} /> Share
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContainer;
