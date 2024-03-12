import moment from "moment-timezone";
import React from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { handleAxiosResponseError } from "../../../../../Util/Hooks/useAxiosSecure";
import usePContext from "../../../../../Util/Hooks/usePContext";
import { useDeleteUserCourseTimeMutation } from "../../../../../redux/Api/UserManagmentApi/UserManagmentApi";

const SingleCourseTime = ({ courseTime, small }) => {
  const { status, startDate, endDate, durationInMonths, _id } = courseTime;
  const [deleteCourseTime] = useDeleteUserCourseTimeMutation();
  const { loggedUser } = usePContext();

  const handleDeleteCourseTime = async (_id) => {
    Swal.fire({
      title: `Are You Sure Delete This Device`,
      text: "After Delete You won't Revert It!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updateUser = await deleteCourseTime(_id);
          toast.success(updateUser.data.message);
        } catch (error) {
          handleAxiosResponseError(error);
        }
      }
    });
  };

  return (
    <div
      className={`border-2 border-P-primary p-5 rounded-lg ${
        small && "xl:w-1/2"
      }  space-y-1 mt-4`}>
      <div className="flex justify-between">
        <span
          className={`text-xl font-semibold ${
            status === "ONGOING" && "text-green-500"
          } ${status === "ENDED" && "text-red-500"} ${
            status === "UPCOMING" && "text-yellow-500"
          } `}>
          {status}
        </span>
        {loggedUser?.role === "Admin" && (
          <span
            className="p-2 text-xl rounded-full bg-red-300 cursor-pointer"
            onClick={() => handleDeleteCourseTime(_id)}>
            <MdDelete className="text-red-500" />
          </span>
        )}
      </div>
      <p>
        <span className="font-semibold">Start Time : </span>
        {moment(startDate).local().format("MMMM D, YYYY ")}
      </p>
      <p>
        <span className="font-semibold">End Time : </span>
        {moment(endDate).local().format("MMMM D, YYYY ")}
      </p>
      <p>
        <span className="font-semibold">Months : </span>
        {durationInMonths} months
      </p>
    </div>
  );
};

export default SingleCourseTime;
