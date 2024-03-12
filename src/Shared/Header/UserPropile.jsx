import React from "react";
import { Link } from "react-router-dom";
import usePContext from "../../Util/Hooks/usePContext";
import userImg from "../../assets/Images/userDefault.jpg";
const UserPropile = () => {
  const { loggedUser } = usePContext();

  // console.log(SingleUser);
  return (
    <Link
      to={`/propile/${loggedUser._id}`}
      className="h-12 w-12 rounded-full overflow-hidden  border-2 border-P-gry cursor-pointer relative">
      <img src={loggedUser?.photoURL || userImg} alt="" className="w-full " />
    </Link>
  );
};

export default UserPropile;
