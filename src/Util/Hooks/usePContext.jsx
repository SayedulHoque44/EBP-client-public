import { useContext } from "react";
import { PContextProvider } from "../Context/PContext";

const usePContext = () => {
  const value = useContext(PContextProvider);
  // console.log(value);
  return value;
};

export default usePContext;
