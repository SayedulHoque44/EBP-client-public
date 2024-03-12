import React, { useEffect, useRef, useState } from "react";
import { CiUser } from "react-icons/ci";
import {
  MdOutlineEditNote,
  MdOutlineLocalPhone,
  MdOutlineLocationOn,
  MdPayments,
} from "react-icons/md";

import toast from "react-hot-toast";
import { AiOutlineMail } from "react-icons/ai";
import { ImSpinner9 } from "react-icons/im";
import PCustomBtn from "../../../Shared/Components/PCustomBtn";
import useAxiosSecure, {
  handleAxiosResponseError,
} from "../../../Util/Hooks/useAxiosSecure";
import usePContext from "../../../Util/Hooks/usePContext";
import { useUpdateSingleUserMutation } from "../../../redux/Api/UserManagmentApi/UserManagmentApi";
import "./UpdateUser.css";

const UpdateUser = ({ SingleUser, editOpen, setEditOpen }) => {
  const {
    _id,
    imageUrl,
    paymentReceipt,
    courseTimes,
    paymentStatus,
    email = "",
    paymantNote = "",
    name,
    pin,
    phone,
    city,
    type,
    status,
    role,
    note = "",
    group,
  } = SingleUser;
  const [loading, setLoading] = useState(false);
  const [matchedPin, setMatchedPin] = useState(false);
  const [updateUserQuery] = useUpdateSingleUserMutation();
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [errorObj, setErrorObj] = useState({});
  const { localSecureNewAxios } = useAxiosSecure();
  const { loggedUser } = usePContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedRecipt, setSelectedRecipt] = useState(null);
  const [userDataObj, setUserDataObj] = useState({});
  const [selectPayment, setSelectPayment] = useState(paymentStatus);
  const [selectStatus, setSelectStatus] = useState(status);
  const formRef = useRef(null);

  // --> name
  const handleName = (e) => {
    const value = e.target.value;

    if (name !== value) {
      if (/^.{3,20}$/.test(value)) {
        setUserDataObj({ ...userDataObj, name: e.target.value });
        delete errorObj["name"];
      } else {
        delete userDataObj["name"];
        setErrorObj({
          ...errorObj,
          name: "min(3) & max(20) character required",
        });
      }
    } else {
      delete userDataObj["name"];
      delete errorObj["name"];
      setUserDataObj({ ...userDataObj });
    }
  };
  // --> email
  const handlEmail = (e) => {
    const value = e.target.value;

    if (email !== value) {
      if (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
        setUserDataObj({ ...userDataObj, email: e.target.value });
        delete errorObj["email"];
      } else {
        delete userDataObj["email"];
        setErrorObj({ ...errorObj, email: "invalid email!" });
      }
    } else {
      delete userDataObj["email"];
      delete errorObj["email"];
      setUserDataObj({ ...userDataObj });
    }
  };
  // --> paymant note
  const handlePaymantNote = (e) => {
    const value = e.target.value;
    if (paymantNote !== value) {
      setUserDataObj({ ...userDataObj, paymantNote: e.target.value });
    } else {
      delete userDataObj["paymantNote"];
      setUserDataObj({ ...userDataObj });
    }
  };
  // -->  note
  const handleNote = (e) => {
    const value = e.target.value;
    if (note !== value) {
      setUserDataObj({ ...userDataObj, note: e.target.value });
    } else {
      delete userDataObj["note"];
      setUserDataObj({ ...userDataObj });
    }
  };
  // --> phone
  const handlePhone = (e) => {
    const value = e.target.value;

    if (phone !== value) {
      if (/^\+39\d{10}$/.test(value)) {
        setUserDataObj({ ...userDataObj, phone: e.target.value });
        delete errorObj["phone"];
      } else {
        delete userDataObj["phone"];
        setErrorObj({ ...errorObj, phone: "invalid phone!" });
      }
    } else {
      delete userDataObj["phone"];
      delete errorObj["phone"];
      setUserDataObj({ ...userDataObj });
    }
  };
  // --> city
  const handleCity = (e) => {
    const value = e.target.value;

    if (city !== value) {
      if (/^.{3,20}$/.test(value)) {
        setUserDataObj({ ...userDataObj, city: e.target.value });
        delete errorObj["city"];
      } else {
        delete userDataObj["city"];
        setErrorObj({
          ...errorObj,
          city: "min(3) & max(20) character required",
        });
      }
    } else {
      delete userDataObj["city"];
      delete errorObj["city"];
      setUserDataObj({ ...userDataObj });
    }
  };
  // --> city
  const handleGroup = (e) => {
    const value = e.target.value;

    if (group !== value) {
      if (/^.{1,20}$/.test(value)) {
        setUserDataObj({ ...userDataObj, group: e.target.value });
        delete errorObj["group"];
      } else {
        delete userDataObj["group"];
        setErrorObj({
          ...errorObj,
          group: "min(3) & max(20) character required",
        });
      }
    } else {
      delete userDataObj["group"];
      delete errorObj["group"];
      setUserDataObj({ ...userDataObj });
    }
  };
  // --> payment
  const handlePayment = (e) => {
    const value = e.target.value;
    setSelectPayment(value);

    if (value !== paymentStatus) {
      setUserDataObj({ ...userDataObj, paymentStatus: value });
    } else {
      delete userDataObj["paymentStatus"];
      setUserDataObj({ ...userDataObj });
    }
  };
  // --> status
  const handleStatus = (e) => {
    const value = e.target.value;
    setSelectStatus(value);

    if (value !== status) {
      setUserDataObj({ ...userDataObj, status: value });
    } else {
      delete userDataObj["status"];
      setUserDataObj({ ...userDataObj });
    }
  };
  // --> Reset Pin
  const handleCurrentPin = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCurrentPin(value);
      if (Number(value) === pin) {
        setMatchedPin(true);
      } else {
        setMatchedPin(false);
      }
    }
  };
  const handleNewPin = (e) => {
    const value = e.target.value;

    // pin must be digit
    if (/^[1-9]\d{0,5}$|^$/.test(value)) {
      setNewPin(value);
      delete errorObj["pin"];
      delete userDataObj["pin"];
      if (!/(\d)\1{3,}/.test(value)) {
        delete errorObj["pin"];
        delete userDataObj["Pin"];
        if (Number(value) !== pin && value.length >= 4) {
          setUserDataObj({ ...userDataObj, pin: Number(value) });
        } else {
          delete userDataObj["pin"];
          setErrorObj({
            ...errorObj,
            pin: "পিন একই হতে পারবে না। এবং পিন মিনিমাম ৪-৬ সংখ্যা এর হতে হবে।",
          });
        }
      } else {
        delete userDataObj["pin"];
        setErrorObj({
          ...errorObj,
          pin: "দুর্বল পিন প্রযোজ্য নয়, আবার পিন দিয়ে চেষ্টা করুন।",
        });
      }
    } else {
      delete userDataObj["pin"];
      setErrorObj({ ...errorObj, pin: "পিন মিনিমাম ৪-৬ সংখ্যা এর হতে হবে।" });
    }
  };

  // check valid user edit field found
  const userObjKeysExits = (userDataObj) => {
    let found = true;
    if (userDataObj && Object.keys(userDataObj).length > 0) {
      found = false;
    }
    return found;
  };

  //
  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const updateUser = await updateUserQuery({
        userId: _id,
        userData: userDataObj,
      });
      toast.success(updateUser?.data?.message);
      setLoading(false);

      setEditOpen(false);
    } catch (error) {
      setLoading(false);
      handleAxiosResponseError(error);
      console.log(error);
    }
  };

  //
  // console.log(userDataObj);

  useEffect(() => {
    setUserDataObj({});
    setErrorObj({});
    setSelectPayment(paymentStatus);
    setSelectStatus(status);
    setNewPin("");
    setCurrentPin("");
    setMatchedPin(false);
  }, [editOpen]);

  return (
    <>
      <form
        onSubmit={handleUpdateUser}
        className="border-y-2 border-dashed border-P-primary  py-10 my-5 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Full Name */}
          <div>
            <span className="text-[#625c78] flex gap-1 items-center">
              {" "}
              <CiUser className="text-P-primary text-lg" />
              Full Name
            </span>
            {editOpen ? (
              <>
                <input
                  type="text"
                  onChange={handleName}
                  defaultValue={name}
                  className="p-2 border-2 border-P-primary w-3/4 text-black"
                  name="name"
                  placeholder="Update Your Name"
                />
                {errorObj?.name && (
                  <p className="text-error">{errorObj?.name}</p>
                )}
              </>
            ) : (
              <h2 className="font-semibold">{name}</h2>
            )}
          </div>
          {/* Email */}
          <div>
            <span className="text-[#625c78] flex gap-1 items-center">
              <AiOutlineMail className="text-P-primary text-lg" /> Email
            </span>
            {editOpen ? (
              <>
                <input
                  type="text"
                  onChange={handlEmail}
                  defaultValue={email || null}
                  className="p-2 border-2 border-P-primary w-3/4 text-black"
                  name="email"
                  placeholder="Update Your email"
                />
                {errorObj?.email && (
                  <p className="text-error">{errorObj?.email}</p>
                )}
              </>
            ) : (
              <h2 className="font-semibold">{email || "N/A"}</h2>
            )}
          </div>
          {/* Phone */}
          <div>
            <span className="text-[#625c78] flex gap-1 items-center">
              {" "}
              <MdOutlineLocalPhone className="text-P-primary text-lg" />
              Phone
            </span>
            {/* admin only -> */}
            {editOpen && loggedUser.role === "Admin" ? (
              <>
                <input
                  type="text"
                  onChange={handlePhone}
                  defaultValue={phone}
                  className="p-2 border-2 border-P-primary w-3/4 text-black"
                  name="phone"
                  placeholder="Update user phone"
                />
                {errorObj?.phone && (
                  <p className="text-error">{errorObj?.phone}</p>
                )}
              </>
            ) : (
              <h2 className="font-semibold">{phone}</h2>
            )}
          </div>
          {/* city */}
          <div>
            <span className="text-[#625c78] flex gap-1 items-center">
              <MdOutlineLocationOn className="text-P-primary text-lg" /> City
            </span>
            {editOpen ? (
              <>
                <input
                  type="text"
                  onChange={handleCity}
                  defaultValue={city}
                  className="p-2 border-2 border-P-primary w-3/4 text-black"
                  name="city"
                  placeholder="Update Your city"
                />
                {errorObj?.city && (
                  <p className="text-error">{errorObj?.city}</p>
                )}
              </>
            ) : (
              <h2 className="font-semibold">{city}</h2>
            )}
          </div>
          {/* group */}
          <div>
            <span className="text-[#625c78] flex gap-1 items-center">
              <MdOutlineLocationOn className="text-P-primary text-lg" /> Group
            </span>
            {editOpen && loggedUser.role === "Admin" ? (
              <>
                <input
                  type="text"
                  onChange={handleGroup}
                  defaultValue={group}
                  className="p-2 border-2 border-P-primary w-3/4 text-black"
                  name="group"
                  placeholder="Update Your group"
                />
                {errorObj?.group && (
                  <p className="text-error">{errorObj?.group}</p>
                )}
              </>
            ) : (
              <h2 className="font-semibold">{group}</h2>
            )}
          </div>
          {/* Paymant Note */}
          {loggedUser.role === "Admin" && (
            <div>
              <span className="text-[#625c78] flex gap-1 items-center">
                <MdPayments className="text-P-primary text-lg" /> Paymant Note
              </span>
              {editOpen ? (
                <>
                  <input
                    type="text"
                    onChange={handlePaymantNote}
                    defaultValue={paymantNote}
                    className="p-2 border-2 border-P-primary w-3/4 text-black"
                    name="paymantNote"
                    placeholder="Update Your paymantNote"
                  />
                </>
              ) : (
                <h2 className="font-semibold">{paymantNote || "N/A"}</h2>
              )}
            </div>
          )}
          {/*  Note */}
          {loggedUser?.role === "Admin" && (
            <div>
              <span className="text-[#625c78] flex gap-1 items-center">
                <MdOutlineEditNote className="text-P-primary text-lg" /> Note
              </span>
              {editOpen ? (
                <>
                  <input
                    type="text"
                    onChange={handleNote}
                    defaultValue={note}
                    className="p-2 border-2 border-P-primary w-3/4 text-black"
                    name="note"
                    placeholder="Update Your note"
                  />
                </>
              ) : (
                <h2 className="font-semibold">{note || "N/A"}</h2>
              )}
            </div>
          )}
        </div>

        {/* pin reset */}
        {editOpen && (
          <>
            <h1 className="text-2xl my-5 text-P-primary ">Pin Reset</h1>
            <div className="grid lg:grid-cols-2 gap-2">
              <input
                type="text"
                onChange={handleCurrentPin}
                className="p-2 border-2 border-P-primary w-3/4 text-black"
                value={currentPin}
                name="currentPin"
                placeholder="Enter Current Pin"
              />
              <div>
                <input
                  type="text"
                  onChange={handleNewPin}
                  value={newPin}
                  disabled={!matchedPin}
                  className="p-2 border-2 border-P-primary w-3/4 text-black disabled:cursor-not-allowed"
                  name="newPin"
                  placeholder="Enter New Pin"
                />
                {errorObj?.pin && <p className="text-error">{errorObj?.pin}</p>}
              </div>
            </div>
          </>
        )}

        {/* paymant and status */}
        {SingleUser.role !== "Admin" && (
          <div>
            <h1 className="text-2xl my-5 text-P-primary ">Paymant & Status</h1>
            {editOpen && loggedUser.role === "Admin" ? (
              <>
                <div className="flex gap-4 mb-4">
                  <label>
                    <PCustomBtn type={"paid"}>
                      <input
                        type="radio"
                        value="paid"
                        checked={selectPayment === "paid"}
                        onChange={handlePayment}
                      />
                      paid
                    </PCustomBtn>
                  </label>
                  <label>
                    <PCustomBtn type={"unPaid"}>
                      <input
                        type="radio"
                        value="unPaid"
                        checked={selectPayment === "unPaid"}
                        onChange={handlePayment}
                      />
                      unPaid
                    </PCustomBtn>
                  </label>
                </div>
                {/* status */}
                <div className="flex gap-4">
                  <label>
                    <PCustomBtn type={"Active"}>
                      <input
                        type="radio"
                        value="Active"
                        checked={selectStatus === "Active"}
                        onChange={handleStatus}
                      />
                      Active
                    </PCustomBtn>
                  </label>
                  <label>
                    <PCustomBtn type={"Passed"}>
                      <input
                        type="radio"
                        value="Passed"
                        checked={selectStatus === "Passed"}
                        onChange={handleStatus}
                      />
                      Passed
                    </PCustomBtn>
                  </label>

                  <label>
                    <PCustomBtn type={"Disabled"}>
                      <input
                        type="radio"
                        value="Disabled"
                        checked={selectStatus === "Disabled"}
                        onChange={handleStatus}
                      />
                      Disabled
                    </PCustomBtn>
                  </label>
                  <label>
                    <PCustomBtn type={"Block"}>
                      <input
                        type="radio"
                        value="Block"
                        checked={selectStatus === "Block"}
                        onChange={handleStatus}
                      />
                      Block
                    </PCustomBtn>
                  </label>
                </div>
              </>
            ) : (
              <div className=" flex gap-2">
                <PCustomBtn type={paymentStatus}>{paymentStatus}</PCustomBtn>
                <PCustomBtn type={status}>{status}</PCustomBtn>
              </div>
            )}
          </div>
        )}

        {editOpen && (
          <button
            className=" flex justify-center p-2 py-3 text-white bg-orange-400 w-full disabled:bg-slate-600 mt-5"
            disabled={
              userObjKeysExits(userDataObj) ||
              Object.keys(errorObj).length > 0 ||
              loading
            }>
            {loading ? <ImSpinner9 className="animate-spin" /> : "save"}
          </button>
        )}
      </form>
    </>
  );
};

export default UpdateUser;
