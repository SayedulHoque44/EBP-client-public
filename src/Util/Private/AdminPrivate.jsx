import React from "react";
import { Navigate } from "react-router-dom";
import LoaderCircleWithBar from "../../Shared/Components/LoaderCircleWithBar";
import usePContext from "../Hooks/usePContext";

const AdminPrivate = ({ children }) => {
  const { loggedUser, loading } = usePContext();

  if (loading) {
    return <LoaderCircleWithBar />;
  } else if (loggedUser?.role === "Admin") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default AdminPrivate;
