import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useGetSingleUser from "../../../Util/Hooks/useGetSingleUser";
import usePContext from "../../../Util/Hooks/usePContext";

const Book = ({ book }) => {
  const { title, description, _id, coverImage, route } = book;
  const { loggedUser, loading } = usePContext();
  const [SingleUser, refetch, isLoading, SingleUserError] = useGetSingleUser(
    loggedUser._id
  );

  // const { isUser } = useIsUser();
  const navigate = useNavigate();

  const handlePaidCheck = () => {
    // logged user is admin
    if (loggedUser?.role === "Admin") {
      return navigate(`/dashboard/patenteBooks/${_id || route}`);
    }
    if (SingleUser.status === "Passed") {
      return toast.error("You are already passed!");
    }
    // user active and paid
    if (
      SingleUser?.status === "Active" &&
      SingleUser?.paymentStatus === "paid"
    ) {
      navigate(`${_id || route}`);
    } else if (SingleUser?.status === "Active") {
      toast.error("কিছু সম্যসা হয়েছে !");
    } else if (SingleUser?.paymentStatus === "paid") {
      toast.error("কিছুক্ষন পরে চেষ্টা করুন ।");
    } else {
      toast.error("আপনাকে কোর্সটা কিনতে হবে।");
    }
  };

  return (
    <div
      onClick={handlePaidCheck}
      className="max-w-sm mx-auto cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <span>
        <img
          className="rounded-t-lg h-[400px] mx-auto"
          src={coverImage}
          alt=""
        />
      </span>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          বইটি পডুন
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Book;
