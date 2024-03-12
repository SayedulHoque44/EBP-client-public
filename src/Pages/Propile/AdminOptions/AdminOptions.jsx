import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { patenteAxios } from "../../../Util/Hooks/useAxiosSecure";
import UserAction from "../../Dashboard/Users/UserAction/UserAction";

const AdminOptions = ({ user, refetch }) => {
  const [loading, setLoading] = useState(null);
  const {
    _id,
    imageUrl,
    email,
    name,
    phone,
    city,
    type,
    status,
    role,
    paymentReceipt,
  } = user;
  // console.log(user);
  // Change user type
  const handlePaymentStatus = (user, type) => {
    // console.log(type);
    patenteAxios
      .patch(`/typeUser/${user._id}`, type)
      .then((res) => {
        // console.log(res.data);

        if (res.data.modifiedCount > 0) {
          toast.success(`${name} ${type.type} Now.`);
          refetch();
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  if (role === "Admin") {
    return <p className="text-center text-success">I am Admin</p>;
  } else
    return (
      <div className="mt-5  border-t-2 border-P-primary">
        <h1 className="text-4xl my-5 text-center">Admin Options</h1>
        <div className="flex flex-col pb-5 border-b-[1px] border-P-gry items-center">
          <h3 className="font-semibold mb-2">User Action</h3>
          <div className="flex items-center gap-3">
            {/*  */}
            <UserAction user={user} refetch={refetch} />
            {/*  */}
            {role !== "Admin" &&
              (type === "Paid" ? (
                <button
                  title="Make unPaid"
                  className="btn hover:bg-amber-500 bg-error btn-xs"
                  onClick={() => handlePaymentStatus(user, { type: "unPaid" })}>
                  Make unPaid
                </button>
              ) : (
                <button
                  title="Make Paid"
                  className="btn hover:bg-amber-500 bg-success btn-xs"
                  onClick={() => handlePaymentStatus(user, { type: "Paid" })}>
                  Make Paid
                </button>
              ))}
          </div>
        </div>

        {paymentReceipt && (
          <div className="flex flex-col py-5 border-b-[1px] border-P-gry items-center">
            <h3 className="font-semibold mb-2">Payment Receipt</h3>
            <div>
              <img src={paymentReceipt} alt="receipt" />
              <a
                className="my-2 text-P-primary"
                href={paymentReceipt}
                download={paymentReceipt}>
                Downlode Link
              </a>
            </div>
          </div>
        )}
      </div>
    );
};

export default AdminOptions;
