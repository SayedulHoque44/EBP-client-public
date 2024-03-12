import moment from "moment-timezone";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { FcOvertime } from "react-icons/fc";
import PButton from "../../../Shared/Components/PButton";
import useAxiosSecure, {
  handleAxiosResponseError,
} from "../../../Util/Hooks/useAxiosSecure";
import usePContext from "../../../Util/Hooks/usePContext";
import { useUpdateUserCourseTimeMutation } from "../../../redux/Api/UserManagmentApi/UserManagmentApi";
import CourseTimeShow from "./CourseTimeShow/CourseTimeShow";

//
const UpdateDuration = ({ SingleUser }) => {
  const { loggedUser } = usePContext();

  const { localSecureNewAxios } = useAxiosSecure();
  const [startDate, setStartDate] = useState(); // Start date selected by the user
  const [endDate, setEndDate] = useState();
  const [months, setMonths] = useState();
  const [courseTimeQuery, { isLoading }] = useUpdateUserCourseTimeMutation();
  const {
    _id,
    imageUrl,
    paymentReceipt,
    courseTimes,
    email,
    name,
    phone,
    city,
    type,
    status,
    role,
    Note,
    group,
  } = SingleUser;
  //
  //
  const handleMonths = (e) => {
    const month = e.target.value;
    if (month) {
      setMonths(month);
      if (startDate) {
        const newEndDate = moment(startDate).add(month, "months");
        setEndDate(newEndDate.toDate());
      } else {
        setEndDate("");
      }
    } else {
      setMonths("");
    }
  };
  //
  const handleStartDate = (date) => {
    setStartDate(date);
    if (months) {
      const newEndDate = moment(date).add(months, "months");
      setEndDate(newEndDate.toDate());
    } else {
      setEndDate("");
    }
  };

  const handleUpdatDuration = async (e) => {
    e.preventDefault();
    if (!months || !endDate) {
      return toast.error("Please Select End Date");
    }
    if (!startDate) {
      return toast.error("Please Select Start Date");
    }
    const courseTimeData = {
      userId: _id,
      startDate,
      endDate,
      durationInMonths: Number(months),
    };

    // Update

    try {
      const createdCourse = await courseTimeQuery(courseTimeData);
      if (createdCourse?.data?.success) {
        toast.success(createdCourse?.data?.message);
      }
    } catch (error) {
      handleAxiosResponseError(error);
    }
  };
  //

  //
  return (
    <>
      {loggedUser.role === "Admin" && (
        <span
          className="flex items-center gap-2 mt-3 cursor-pointer bg-orange-500 text-orange-900 px-5 py-3 rounded"
          onClick={() => window.my_modal_4.showModal()}>
          <FcOvertime size={25} />
          <span>Update Course Duration</span>
        </span>
      )}
      <div>
        {courseTimes?.length > 0 ? (
          <CourseTimeShow courseTimes={courseTimes} />
        ) : (
          <p className="text-warning">You Dont have any enrolled Courses!</p>
        )}
      </div>
      {/* Modal */}
      <dialog id="my_modal_4" className="modal  text-black">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form className="flex flex-col gap-4" onSubmit={handleUpdatDuration}>
            <h1 className="text-center">
              Update <span className="text-orange-500">{name}</span>
            </h1>

            <p>Select Start Date</p>
            <DatePicker
              selected={startDate}
              showTimeSelect
              onChange={(date) => handleStartDate(date)}
              className="p-2 border-2 border-P-primary"
              placeholderText="Start Date"
            />
            <p>Select Months</p>
            <input
              type="number"
              className="p-2 border-2 border-P-primary"
              value={months}
              onChange={(e) => handleMonths(e)}
              placeholder="Duration (months)"
            />

            {startDate && (
              <p>
                <span className="font-semibold">Start Time : </span>
                {moment(startDate).local().format("MMMM D, YYYY h:mm A Z")}
              </p>
            )}
            {endDate && (
              <p>
                <span className="font-semibold">End Time : </span>
                {moment(endDate).local().format("MMMM D, YYYY h:mm A Z")}
              </p>
            )}

            <PButton text={"update"} loading={isLoading} type="submit" />
          </form>
        </div>
      </dialog>
    </>
  );
};

export default UpdateDuration;
