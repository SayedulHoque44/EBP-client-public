import moment from "moment-timezone";
import React from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { patenteAxios } from "./useAxiosSecure";

const useFuntionality = () => {
  //   delete--Single--User
  const handleDeleteUser = (user, refetch) => {
    Swal.fire({
      title: `Are You Sure Delete ${user.name}`,
      text: "After Delete You won't Revert It!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        patenteAxios
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              toast.success(`${user.name} Deleted!`);
            }
            refetch();
          })
          .catch((err) => toast.error(err.message));
      }
    });
  };

  // Hangdle Make User Active
  const handleStatusUser = (user, status, refetch) => {
    patenteAxios
      .patch(`/users/${user._id}`, status)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(
            `${user.name} is now ${
              status.status === "Active" ? "Active" : "Disabled"
            } !`
          );
        }
      })
      .catch((err) => toast.error(err.message));
  };

  // Delete Youtube video
  const handleDeleteYVideo = (video, refetch) => {
    // console.log(video.id);
    Swal.fire({
      title: `Are You Sure Delete ${video.title}`,
      text: "After Delete You won't Revert It!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        patenteAxios
          .delete(`/youtubeVideo/${video._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              toast.success(`${video.title} Deleted!`);
            }
            refetch();
          })
          .catch((err) => toast.error(err.message));
      }
    });
  };

  return { handleDeleteUser, handleStatusUser, handleDeleteYVideo };
};

export default useFuntionality;

// uplode images in imgbb
export const uplodeAndGetImagUrl = async (image) => {
  // data packet
  const formData = new FormData();
  formData.append("image", image);
  // url value
  const url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_imgBB_key
  }`;

  const response = await fetch(url, { method: "POST", body: formData });
  const result = await response.json();
  return result?.data;
};

// update User
export const updateUser = async (
  updateValues,
  previousValues,
  setLoading,
  refetch
) => {
  const {
    _id,
    imageUrl,
    paymentReceipt,
    email,
    name,
    phone,
    city,
    type,
    status,
    role,
    Note,
    group,
  } = previousValues;

  setLoading(true);

  try {
    // Replace Photo
    if (updateValues.replaceImageUrl) {
      const imageData = await uplodeAndGetImagUrl(updateValues.replaceImageUrl);
      if (imageData.display_url) {
        const imageUrl = imageData.display_url; //imageUrl
        patenteAxios.patch(`/updateUser/${_id}`, { imageUrl });
      } else {
        setLoading(false);
      }
    }

    // Replace PaymentReceipt
    if (updateValues.replacePaymentReceipt) {
      const imageData = await uplodeAndGetImagUrl(
        updateValues.replacePaymentReceipt
      );
      if (imageData.display_url) {
        const paymentReceipt = imageData.display_url; //paymentReceipt
        patenteAxios.patch(`/updateUser/${_id}`, { paymentReceipt });
      } else {
        setLoading(false);
      }
    }

    // Replace Name
    if (updateValues.Uname !== name) {
      patenteAxios.patch(`/updateUser/${_id}`, { name: updateValues.Uname });
    }

    // Replace phone
    if (updateValues.Uphone !== phone) {
      patenteAxios.patch(`/updateUser/${_id}`, {
        phone: updateValues.Uphone,
      });
    }

    // Replace phone
    if (updateValues.Ugroup !== group) {
      patenteAxios.patch(`/updateUser/${_id}`, {
        group: updateValues.Ugroup,
      });
    }
    // Replace Note
    if (updateValues.UNote !== Note) {
      patenteAxios.patch(`/updateUser/${_id}`, {
        Note: updateValues.UNote,
      });
    }
    refetch();
    setLoading(false);
    return true;
  } catch (err) {
    refetch();
    setLoading(false);
    toast.error(err.message);
    return false;
  }
};

// Create new device
export const PostUserDevice = async (userId) => {
  const deviceInfo = navigator.userAgent;
  const device = {
    userId,
    createdAt: moment().local().format("MMMM D, YYYY h:mm A Z"),
    deviceInfo,
  };
  const res = await patenteAxios.post(`/DeviceUsers`, {
    ...device,
  });

  return res.data;
};

// Get all devices by user id
export const getAllDeviceByUserId = async (userId) => {
  const res = await patenteAxios(`/DeviceUsers/${userId}`);
  return res.data;
};
//
// Function to format remaining time in years, months, days, hours, minutes, and seconds
function formatTime(time) {
  const years = time.years();
  const months = time.months();
  const days = time.days();
  const hours = time.hours();
  const minutes = time.minutes();
  const seconds = time.seconds();

  const formattedTime = [];

  if (years > 0) {
    formattedTime.push(
      <span
        key="years"
        className="flex px-2 py-1  shadow-md flex-col justify-center">
        <span className="text-2xl"> {years}</span>{" "}
        <span className="text-sm">{years === 1 ? "Year" : "Years"}</span>
      </span>
    );
  }

  if (months > 0) {
    formattedTime.push(
      <span
        key="months"
        className="flex px-2 py-1  shadow-md flex-col justify-center">
        <span className="text-2xl">{months}</span>{" "}
        <span className="text-sm">{months === 1 ? "Month" : "Months"}</span>
      </span>
    );
  }

  if (days > 0) {
    formattedTime.push(
      <span
        key="days"
        className="flex px-2 py-1  shadow-md flex-col justify-center">
        <span className="text-2xl">{days}</span>{" "}
        <span className="text-sm">{days === 1 ? "Day" : "Days"}</span>
      </span>
    );
  }

  if (hours > 0) {
    formattedTime.push(
      <span
        key="hours"
        className="flex px-2 py-1  shadow-md flex-col justify-center">
        <span className="text-2xl">{hours}</span>{" "}
        <span className="text-sm"> {hours === 1 ? "Hour" : "Hours"}</span>
      </span>
    );
  }

  if (minutes > 0) {
    formattedTime.push(
      <span
        key="minutes"
        className="flex px-2 py-1  shadow-md flex-col justify-center">
        <span className="text-2xl">{minutes}</span>{" "}
        <span className="text-sm"> {minutes === 1 ? "Minute" : "Minutes"}</span>
      </span>
    );
  }

  if (seconds >= 0) {
    formattedTime.push(
      <span
        key="seconds"
        className="flex px-2 py-1  shadow-md flex-col justify-center">
        <span className="text-2xl">{seconds}</span>{" "}
        <span className="text-sm">
          {seconds === 1 || seconds === 0 ? "Second" : "Seconds"}
        </span>
      </span>
    );
  }

  return (
    <div className="formatted-time">
      <h1 className="text-2xl">Your Course Remaining Time </h1>
      <div className="flex gap-1 justify-center items-center mt-2">
        {formattedTime.map((part, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-2xl">:</span>}{" "}
            {/* Add comma and space between parts */}
            {part}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
// Course Time checker

export const Timecheckers = (startDate, endDate, remainingTime) => {
  const courseStartTime = new Date(startDate).getTime();
  const courseEndTime = new Date(endDate).getTime();
  const currentTime = new Date().getTime();

  // check course time started or not
  if (courseEndTime <= currentTime) {
    return (window.location.href = "/dashboard");
  }
  return formatTime(remainingTime);
};
