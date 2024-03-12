import React from "react";
import logo from "../../assets/Images/logo.png";
const Logo = ({ nameColor }) => {
  return (
    <div className="flex items-center gap-1">
      <img className="h-20 " src={logo} alt="" />
      <span
        className={`${nameColor} text-md md:text-lg lg:text-xl font-semibold`}>
        Easy Bangla Patente
      </span>
    </div>
  );
};

export default Logo;
