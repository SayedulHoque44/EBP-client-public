import moment from "moment-timezone";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbCalendarTime } from "react-icons/tb";
import { useParams } from "react-router-dom";
import LoaderCircleWithBar from "../../Shared/Components/LoaderCircleWithBar";
import PCustomBtn from "../../Shared/Components/PCustomBtn";
import Container from "../../Shared/Container/Container";
import usePContext from "../../Util/Hooks/usePContext";
import userImg from "../../assets/Images/userDefault.jpg";
import { useGetSingleUserQuery } from "../../redux/Api/UserManagmentApi/UserManagmentApi";
import DeviceShow from "./DeviceShow/DeviceShow";
import UpdateDuration from "./UpdateDuration/UpdateDuration";
import UpdateUser from "./UpdateUser/UpdateUser";

const Propile = () => {
  const { id } = useParams();
  const { loggedUser } = usePContext();
  const [editOpen, setEditOpen] = useState(false);

  const { data: SingleUser = {}, isLoading } = useGetSingleUserQuery(id);

  const {
    _id,
    propileImageUrl,
    courseTimes,
    group,
    email,
    name,
    phone,
    city,
    status,
    role,
    paymentStatus,
    Note,
    createdAt,
    pin,
    courseDuration,
  } = SingleUser;

  // const { userAllDevice, DeviceRefetch } = useGetAllDeviceByUserId(id);

  return (
    <Container>
      {isLoading ? (
        <LoaderCircleWithBar />
      ) : SingleUser ? (
        <div className="grid text-base  grid-cols-1 xl:grid-cols-4 bg-P-gry min-h-screen gap-8 p-8">
          <div className="xl:col-span-1 bg-white  px-5 py-10 rounded">
            {/* User Image & Badge status */}
            <div className="flex justify-center">
              <div className="avatar indicator">
                {role !== "Admin" && (
                  <span
                    className={`indicator-item badge  ${
                      status === "Active"
                        ? "badge-secondary"
                        : status === "Block"
                        ? "badge-error"
                        : status === "Disabled"
                        ? "badge-neutral"
                        : status === "Passed"
                        ? "badge-success"
                        : ""
                    }`}>
                    {status}
                  </span>
                )}
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={propileImageUrl || userImg} />
                </div>
              </div>
            </div>
            {/*  */}
            <div className="flex flex-col gap-2 items-center justify-center space-y-[.5px] mt-3">
              <h1 className="text-2xl">
                Hello <span className="text-P-primary">{name}</span>
              </h1>
              {/* payment & status */}
              {SingleUser?.role === "Admin" ? (
                <p className="text-green-600">I am Admin</p>
              ) : (
                <>
                  <p>{group}</p>
                  <PCustomBtn type={paymentStatus}>{paymentStatus}</PCustomBtn>
                  <PCustomBtn type={status}>{status}</PCustomBtn>
                </>
              )}
              {/* Email */}
              {email && <span>{email}</span>}
              {loggedUser?.role === "Admin" && (
                <span className="text-primary">Pin : {pin}</span>
              )}
              {/* phone */}
              <span>{phone}</span>
              {/* city */}
              <h3 className="flex gap-1 justify-center items-center font-semibold ">
                {" "}
                <MdOutlineLocationOn className="text-P-primary" /> {city}
              </h3>
              {/* Registration time */}
              <h3 className="flex gap-1 items-center text-xs  justify-center  font-semibold ">
                {" "}
                <span>Regi:</span>
                <span className="flex items-center">
                  <TbCalendarTime className="text-P-primary " />{" "}
                  {moment(createdAt).local().format("MMMM D, YYYY h:mm A Z")}
                </span>
              </h3>
            </div>
          </div>
          {/* ---> My Propile <---  */}
          <div className="xl:col-span-3 bg-white   px-5 py-10 rounded">
            {/* Header  */}
            <div className="flex justify-between">
              <h1 className="text-2xl my-5 text-P-primary ">My Propile</h1>
              <button
                className="flex gap-2 justify-center items-center  cursor-pointer w-32 text-xl text-orange-500"
                onClick={() => setEditOpen(!editOpen)}>
                <FaEdit />
                <span>Edit</span>
              </button>
            </div>
            {/* Update user info */}
            <UpdateUser
              SingleUser={SingleUser}
              editOpen={editOpen}
              setEditOpen={setEditOpen}
              // refetch={refetch}
            />
            {/* update duration  */}
            {SingleUser.role !== "Admin" && (
              <div>
                <h1 className="text-2xl my-5 text-P-primary ">
                  Course Duration
                </h1>
                <UpdateDuration SingleUser={SingleUser} />
              </div>
            )}
            {/* Device */}
            {SingleUser?.deviceLogin?.length > 0 &&
              loggedUser?.role === "Admin" && (
                <div>
                  <h1 className="text-2xl my-5 text-P-primary ">
                    Device Activity
                  </h1>
                  <DeviceShow
                    userAllDevice={SingleUser?.deviceLogin}
                    userId={_id}
                  />
                </div>
              )}
          </div>
        </div>
      ) : (
        <h2 className="text-center my-10">User Not Found! </h2>
      )}
    </Container>
  );
};

export default Propile;
