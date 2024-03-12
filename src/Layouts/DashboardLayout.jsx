import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../Shared/Components/Logo";
import Logout from "../Shared/Header/Logout";
import UserPropile from "../Shared/Header/UserPropile";
import usePContext from "../Util/Hooks/usePContext";

const DashboardLayout = () => {
  const { loggedUser } = usePContext();

  const navItems = (
    <>
      <li>
        <NavLink to={`/`}>Home</NavLink>
      </li>
      <li>
        <NavLink to={`/dashboard`}>Dashboard</NavLink>
      </li>
      {loggedUser.role === "Admin" && (
        <li>
          <NavLink to={`adminManagment/userManagment`}>Admin Managment</NavLink>
        </li>
      )}

      <li>
        <NavLink to={"PrivateVideos"} className="hover:text-P-primary">
          Videos
        </NavLink>
      </li>

      <li>
        <NavLink to={`patenteBooks`}>Books</NavLink>
      </li>
      {loggedUser && (
        <>
          <li>
            <NavLink to={`courseVideo`}>Course Video</NavLink>
          </li>
          <li>
            <span>
              {" "}
              <UserPropile />
            </span>
          </li>
        </>
      )}

      <li>
        <Logout />
      </li>
    </>
  );

  // Secure content
  useEffect(() => {
    // Add the event listener to disable right-click
    window.addEventListener("contextmenu", handleContextMenu);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
  // Function to prevent the context menu
  const handleContextMenu = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">
              <Logo nameColor={"text-P-Black"} />
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal items-center">
                {/* Navbar menu content here */}
                {navItems}
              </ul>
            </div>
          </div>
          {/* ----------------Page content here ------------------------*/}
          <div className="w-full ">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side z-10">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-72 min-h-full bg-base-200 gap-5">
            {/* Sidebar content here */}
            {navItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
