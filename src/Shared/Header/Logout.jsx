import React from "react";
import { toast } from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import usePContext from "../../Util/Hooks/usePContext";
import { logout } from "../../redux/Features/Auth/authSlice";
const Logout = () => {
  const { setLoggedUser } = usePContext();
  const dispatch = useDispatch();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout your Account?",
      text: "You have To Login Again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log out",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoggedUser("");
        dispatch(logout());
        toast.error("Logout !");
      }
    });
  };
  return (
    <span>
      <FiLogOut
        onClick={handleLogout}
        title="Logout"
        size={25}
        className="hover:text-red-600 cursor-pointer"
      />
    </span>
  );
};

export default Logout;
