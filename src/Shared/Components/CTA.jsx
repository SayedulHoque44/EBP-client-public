import React from "react";
import { BsFillTelephoneForwardFill } from "react-icons/bs";

const CTA = ({ phone }) => {
  return (
    <a
      href={`tel:${phone}`}
      className="inline-block border-2 border-P-primary rounded-full p-1 pr-5 mx-auto">
      <div className="flex items-center gap-4">
        <span className="text-sm md:text-md lg:text-lg  xl:text-xl h-14 w-14 rounded-full flex items-center justify-center text-white bg-P-primary">
          <BsFillTelephoneForwardFill />
        </span>
        <span className="text-sm md:text-md lg:text-lg  xl:text-xl">
          {phone}
        </span>
      </div>
    </a>
  );
};

export default CTA;
