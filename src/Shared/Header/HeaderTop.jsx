import React from "react";
import { AiFillFacebook, AiFillYoutube } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbSocial } from "react-icons/tb";
import Container from "../Container/Container";
const HeaderTop = () => {
  return (
    <div className="bg-P-Black py-2">
      <Container>
        <div className="flex justify-between text-white text-sm">
          <div className="flex items-center gap-1">
            <BiAlarm className="text-P-primary text-lg" />
            <span className="uppercase hidden md:inline">TRAINING TIME: </span>
            <span className="text-P-gry font-normal">
              Mon | Wed | Fri 9:00 To 10:30 PM
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MdOutlineLocationOn className="text-P-primary text-lg" />
            <span className="uppercase hidden md:inline">LOCATION:</span>
            <span className="text-P-gry font-normal">Italy</span>
          </div>
          <div className="flex items-center gap-1">
            <TbSocial className="text-P-primary text-lg" />
            <span className="uppercase hidden md:inline">social media:</span>
            <span className="text-P-gry font-normal flex items-center gap-2 ">
              <a
                href="https://www.facebook.com/easybanglapatente2021"
                target="_blank">
                {" "}
                <AiFillFacebook className="hover:text-P-primary text-xl cursor-pointer" />
              </a>
              <a
                href="https://www.youtube.com/@EasyBanglaPatente"
                target="_blank">
                <AiFillYoutube className="hover:text-P-primary text-xl cursor-pointer" />
              </a>
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeaderTop;
