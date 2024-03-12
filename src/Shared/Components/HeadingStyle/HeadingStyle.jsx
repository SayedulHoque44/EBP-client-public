import React from "react";
import "./HeadingStyle.css";
const HeadingStyle = ({ children, className, text }) => {
  return (
    <div className="seven my-4">
      <h1>{text}</h1>
    </div>
  );
};

export default HeadingStyle;
