import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { removeToken } from "../../Pages/Login/loginUtils";
import { useCurrentToken } from "../../redux/Features/Auth/authSlice";
import usePContext from "./usePContext";

//  Axios for normal fetch
export const patenteAxios = axios.create({
  // baseURL: "https://easy-bangla-patente-server.vercel.app/",
  baseURL: "https://easy-bangla-patente-server-sayedulhoque44.vercel.app/",
  // baseURL: "http://localhost:5000/",
});

const localNewAxios = axios.create({
  baseURL: "https://patente-server.vercel.app/api/",
  // baseURL: "http://localhost:3001/api/",
});
const localSecureNewAxios = axios.create({
  baseURL: "https://patente-server.vercel.app/api/",
  // baseURL: "http://localhost:3001/api/",
});

const useAxiosSecure = () => {
  const { loggedUser, setLoggedUser } = usePContext();
  const token = useSelector(useCurrentToken);

  useEffect(() => {
    // Axios request instance
    // console.log(loading);
    localSecureNewAxios.interceptors.request.use((config) => {
      // const token = getToken();
      if (token) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    });
    // Axios response instance
    localSecureNewAxios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          // await logOut();
          // navigate("/login");
          removeToken();
          setLoggedUser("");
        }
        return Promise.reject(error);
      }
    );
    // Axios response instance
    localNewAxios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);

  return { localNewAxios, localSecureNewAxios };
};
export default useAxiosSecure;

// handel axios response
export const handleAxiosResponseError = (error) => {
  if (error?.response?.data) {
    toast.error(error.response.data?.message);
    // console.log(error.response.data);
  } else {
    toast.error(error?.message);
    // console.log(error);
  }
};
