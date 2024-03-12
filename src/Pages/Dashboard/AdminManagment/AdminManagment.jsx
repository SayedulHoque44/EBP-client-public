import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./AdminManagment.css";
const AdminManagment = () => {
  const navItems = (
    <>
      <NavLink className={` py-3 px-5 hover:bg-gray-100`} to={`userManagment`}>
        Users Managment
      </NavLink>
      <NavLink className={` py-3 px-5 hover:bg-gray-100`} to={`blogManagment`}>
        Blogs Managment
      </NavLink>
    </>
  );

  return (
    <div className="py-10">
      <nav id="managmentNav" className="flex border-y-2">
        {navItems}
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminManagment;
