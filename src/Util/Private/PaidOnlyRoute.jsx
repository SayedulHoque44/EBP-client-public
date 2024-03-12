import React from "react";
import LoaderCircleWithBar from "../../Shared/Components/LoaderCircleWithBar";
import usePContext from "../Hooks/usePContext";

const PaidOnlyRoute = ({ children }) => {
  const { loggedUser, loading } = usePContext();

  if (loading) {
    return <LoaderCircleWithBar />;
  } else if (
    loggedUser?.status === "Active" &&
    loggedUser?.paymentStatus === "paid"
  ) {
    return children;
  } else if (loggedUser?.role === "Admin") {
    return children;
  } else {
    return (window.location.href = "/dashboard");
  }
};

export default PaidOnlyRoute;
