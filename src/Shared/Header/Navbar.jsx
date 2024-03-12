import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link, NavLink, useLocation } from "react-router-dom";
import useIsUser from "../../Util/Hooks/useIsUser";
import usePContext from "../../Util/Hooks/usePContext";
import CTA from "../Components/CTA";
import Logo from "../Components/Logo";
import PLinkBtn from "../Components/PLinkBtn";
import Logout from "./Logout";
import UserPropile from "./UserPropile";
const Navbar = () => {
  const { loggedUser } = usePContext();

  const [show, setShow] = useState(false);
  const { isUser, refetch, isLoading } = useIsUser();

  const path = useLocation();

  //
  const navItems = (
    <>
      {path.pathname === "/" && (
        <>
          <a
            href="#Course"
            className="hover:text-P-primary"
            onClick={() => setShow(false)}>
            Course
          </a>

          <a
            href="#videos"
            className="hover:text-P-primary"
            onClick={() => setShow(false)}>
            Our Videos
          </a>
          <a
            href="#DL"
            className="hover:text-P-primary"
            onClick={() => setShow(false)}>
            Driving License
          </a>
        </>
      )}
      <Link
        className="hover:text-P-primary"
        to={"/"}
        onClick={() => setShow(false)}>
        Home
      </Link>
      <NavLink
        to="/blogs"
        className="hover:text-P-primary"
        onClick={() => setShow(false)}>
        Blogs
      </NavLink>

      {loggedUser && (
        <Link
          className="hover:text-P-primary text-orange-500"
          to={"/dashboard"}
          onClick={() => setShow(false)}>
          Dashboard
        </Link>
      )}
    </>
  );
  return (
    <div>
      <div
        className="flex justify-between items-center py-1 md:py-0 md:h-28 bg-no-repeat "
        style={{
          backgroundImage:
            "url(https://fastwpdemo.com/newwp/udrive/wp-content/themes/udrive/assets/images/shape/shape-1.png)",
        }}>
        {/* logo */}
        <Logo nameColor={"text-P-Black"} />
        {/* navigation */}
        <nav className="hidden lg:flex gap-8 items-center ">{navItems}</nav>
        {/* Cta Login user  */}
        <div className="flex items-center gap-5">
          <span className="hidden md:inline">
            <CTA phone={`+39 320 608 8871`} />
          </span>
          {loggedUser ? (
            <>
              <UserPropile />
              <Logout />
            </>
          ) : (
            <>
              {" "}
              <PLinkBtn text={"login"} link={"/login"} />
            </>
          )}
          <span
            className="p-3 lg:hidden border border-purple-500"
            onClick={() => setShow(true)}>
            <HiOutlineMenuAlt3 size={22} />
          </span>
          {show && (
            <div className=" bg-P-primary  text-white max-h-screen w-full absolute top-0 right-0 left-0 bottom-0 z-[999999] p-3">
              <span
                className="p-3 border border-purple-500 absolute right-3"
                onClick={() => setShow(false)}>
                <AiOutlineClose size={22} />
              </span>
              <nav className="flex flex-col justify-center h-full gap-8 items-center ">
                {navItems}
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
