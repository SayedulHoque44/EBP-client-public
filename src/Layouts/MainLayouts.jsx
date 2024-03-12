import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";

const MainLayouts = () => {
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
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayouts;
