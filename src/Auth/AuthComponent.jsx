import { useEffect } from "react";
import { useSelector } from "react-redux";
import usePContext from "../Util/Hooks/usePContext";
import { useGetMeMutation } from "../redux/Api/AuthApi/AuthApi";
import { useCurrentToken } from "../redux/Features/Auth/authSlice";

const AuthComponent = ({ children }) => {
  const { setLoggedUser, setLoading } = usePContext();
  const [getMe] = useGetMeMutation();
  const token = useSelector(useCurrentToken);
  useEffect(() => {
    // const token = getToken();
    const fetachCurrentUser = async (token) => {
      if (token) {
        setLoading(true);
        const deviceInfo = navigator.userAgent;

        const getUser = await getMe({ deviceInfo });

        if (getUser?.data?.success) {
          const currentUser = getUser?.data?.data;
          setLoggedUser(currentUser);
        } else if (getUser?.error) {
          // if it's not unAuthorized error, cz it handaled in baseApi.
          // if (
          //   getUser?.error?.status === 403 ||
          //   getUser?.error?.status === 401
          // ) {
          //   console.log(getUser?.error?.status);
          //   toast.error("Waiting For Server!");
          // }
          setLoggedUser("");
        }

        setLoading(false);
      } else {
        setLoggedUser("");
        setLoading(false);
      }
    };
    //
    fetachCurrentUser(token);
  }, []);

  return children;
};

export default AuthComponent;
