import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoaderCircleWithBar from "../../Shared/Components/LoaderCircleWithBar";
import { useCurrentToken } from "../../redux/Features/Auth/authSlice";
import usePContext from "../Hooks/usePContext";

const PrivateRoute = ({ children }) => {
  const { loggedUser, loading } = usePContext();
  const token = useSelector(useCurrentToken);

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  if (loading) {
    return <LoaderCircleWithBar />;
  } else if (loggedUser) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default PrivateRoute;
