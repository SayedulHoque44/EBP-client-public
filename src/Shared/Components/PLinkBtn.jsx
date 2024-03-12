import React from "react";
import { Link } from "react-router-dom";

const PLinkBtn = ({ link, text, className }) => {
  return (
    <Link
      to={link}
      className={`bg-P-primary inline-block
       text-P-Black md:text-lg text-xs py-3 px-5 ${className} rounded uppercase hover:font-semibold`}>
      {text}
    </Link>
  );
};

export default PLinkBtn;
