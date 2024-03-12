import React from "react";
import DeviceRow from "./DeviceRow/DeviceRow";

const DeviceShow = ({ userAllDevice, userId }) => {
  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-P-Black text-white">
              <th></th>
              <th>Device</th>
              <th>Login date</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {userAllDevice.map((device, index) => (
              <DeviceRow
                key={index}
                index={index}
                device={device}
                userId={userId}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DeviceShow;
