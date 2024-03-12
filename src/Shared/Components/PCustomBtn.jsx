import React from "react";

const PCustomBtn = ({ children, type }) => {
  if (type === "paid") {
    return (
      <span className="font-medium flex gap-1  text-white text-16 px-4 py-1 bg-gradient-to-r from-green-600 to-green-400  rounded-full ">
        {children}
      </span>
    );
  } else if (type === "unPaid") {
    return (
      <span className="font-medium flex gap-1 items-center text-white text-16 px-4 py-1 bg-gradient-to-r from-yellow-600 to-yellow-400  rounded-full ">
        {children}
      </span>
    );
  } else if (type === "Active") {
    return (
      <span className="font-medium flex gap-1 items-center text-white text-16 px-4 py-1  bg-gradient-to-r from-P-primary to-violet-400   rounded-full ">
        {children}
      </span>
    );
  } else if (type === "Disabled") {
    return (
      <span className="font-medium flex gap-1 items-center text-white text-16 px-4 py-1 bg-gradient-to-r from-gray-500 to-gray-400  rounded-full ">
        {children}
      </span>
    );
  } else if (type === "Block") {
    return (
      <span className="font-medium flex gap-1 items-center text-white text-16 px-4 py-1 bg-gradient-to-r from-red-500 to-red-400  rounded-full ">
        {children}
      </span>
    );
  } else if (type === "Passed") {
    return (
      <span className="font-medium flex gap-1  text-white text-16 px-4 py-1 bg-gradient-to-r from-green-600 to-green-400  rounded-full ">
        {children}
      </span>
    );
  }
};

export default PCustomBtn;
