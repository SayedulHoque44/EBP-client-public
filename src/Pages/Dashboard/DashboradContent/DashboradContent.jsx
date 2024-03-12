import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useGetSingleUser from "../../../Util/Hooks/useGetSingleUser";
import usePContext from "../../../Util/Hooks/usePContext";

import homeImg from "../../../assets/Images/dashboard/home-button.png";
import patenteBookImg from "../../../assets/Images/dashboard/online-course.png";
import QNAPdfImg from "../../../assets/Images/dashboard/question.png";
import QNABookImg from "../../../assets/Images/dashboard/quiz.png";
import adminMImg from "../../../assets/Images/dashboard/software-engineer.png";
import courseVideoImg from "../../../assets/Images/dashboard/webinar.png";
import YTVideoImg from "../../../assets/Images/dashboard/youtube.png";

const DashboradContent = ({ user }) => {
  const navigate = useNavigate();
  const { loggedUser, loading } = usePContext();
  const [SingleUser, refetch, isLoading, SingleUserError] = useGetSingleUser(
    loggedUser._id
  );
  //

  const handleRoutes = (path, paidGurd) => {
    if (paidGurd) {
      // logged user is admin
      if (loggedUser?.role === "Admin") {
        return (window.location.href = path);
      }
      if (SingleUser.status === "Passed") {
        return toast.error("You are already passed!");
      }
      // user active and paid
      if (
        SingleUser?.status === "Active" &&
        SingleUser?.paymentStatus === "paid"
      ) {
        return (window.location.href = path);
      } else if (SingleUser?.status === "Active") {
        return toast.error("কিছু সম্যসা হয়েছে !");
      } else if (SingleUser?.paymentStatus === "paid") {
        return toast.error("কিছুক্ষন পরে চেষ্টা করুন ।");
      } else {
        return toast.error("আপনাকে কোর্সটা কিনতে হবে।");
      }
    }
    //
    return (window.location.href = path);
  };

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 py-20">
        {/* Home */}
        <div
          onClick={() => handleRoutes("/")}
          className="flex my-3 py-20 shadow-custom-dashboard-content flex-col items-center justify-center gap-3  cursor-pointer border-P-primary p-10 rounded ">
          <h2 className="text-xl">Home</h2>
          <img src={homeImg} alt="" />
        </div>
        {/* All user */}
        {/* {user?.role === "Admin" && (
          <div
            onClick={() => handleRoutes("/dashboard/allUsers")}
            className="flex my-3 py-20 shadow-custom-dashboard-content flex-col items-center justify-center gap-3  cursor-pointer border-P-primary p-10 rounded ">
            <h2 className="text-xl">All User</h2>
            <FaUsers className="text-7xl" />
          </div>
        )} */}
        {/* Admin Managment */}
        {user?.role === "Admin" && (
          <div
            onClick={() =>
              handleRoutes("/dashboard/adminManagment/userManagment")
            }
            className="flex my-3 py-20 shadow-custom-dashboard-content flex-col items-center justify-center gap-3  cursor-pointer border-P-primary p-10 rounded ">
            <h2 className="text-xl">Admin Managment</h2>
            <img src={adminMImg} alt="" />
          </div>
        )}

        {/* Basic Video */}

        <div
          onClick={() => handleRoutes("/dashboard/PrivateVideos")}
          className="flex my-3 py-20 shadow-custom-dashboard-content flex-col items-center justify-center gap-3  cursor-pointer border-P-primary p-10 rounded ">
          <h2 className="text-xl">Basic Free Videos</h2>
          <img src={YTVideoImg} alt="" />
        </div>

        {/* Patente Book */}
        <div
          onClick={() => handleRoutes("/dashboard/patenteBooks")}
          className="flex my-3 py-20 shadow-custom-dashboard-content flex-col items-center justify-center gap-3  cursor-pointer border-P-primary p-10 rounded ">
          <h2 className="text-xl">Patente Books</h2>
          <img src={patenteBookImg} alt="" />
        </div>

        {/* Courses video */}
        <div
          onClick={() => handleRoutes("/dashboard/courseVideo")}
          className="flex my-3 py-20 shadow-custom-dashboard-content flex-col items-center justify-center gap-3  cursor-pointer border-P-primary p-10 rounded ">
          <h2 className="text-xl">Course videos</h2>
          <img src={courseVideoImg} alt="" />
        </div>

        {/* QNA */}
        <div
          onClick={() => handleRoutes("/dashboard/QNAPdf", true)}
          className="flex my-3 py-20 shadow-custom-dashboard-content flex-col items-center justify-center gap-3  cursor-pointer border-P-primary p-10 rounded ">
          <h2 className="text-xl">SCHEDE ESAME PATENTE (QNA)</h2>
          <p>
            আমাদের স্কুল থেকে যত জন স্টুডেন্ট পাস করেছেন, তাদের পরীক্ষার প্রশ্ন
            এবং উত্তর গুলো PDF ফাইল এর মাধ্যমে দেওয়া আছে।
          </p>
          <img src={QNAPdfImg} alt="" />
        </div>

        <div
          // onClick={() => handleRoutes("/dashboard/QNAPdf", true)}
          className="flex my-3 py-20 shadow-custom-dashboard-content flex-col items-center justify-center gap-3  cursor-pointer border-P-primary p-10 rounded ">
          <h2 className="text-xl">Quiz Book</h2>
          <p>এই বই এ সকল কুইজ এর প্রশ্ন এবং উত্তর পাবেন (৭০০০+ কুইজ)।</p>
          <p className="text-error font-semibold">Coming Soon....</p>
          <img src={QNABookImg} alt="" />
        </div>
      </div>
    </>
  );
};

export default DashboradContent;
