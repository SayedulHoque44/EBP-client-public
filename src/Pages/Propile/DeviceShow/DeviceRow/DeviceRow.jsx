import moment from "moment-timezone";
import React from "react";
import toast from "react-hot-toast";
import { AiFillAndroid, AiFillApple, AiFillWindows } from "react-icons/ai";
import { MdOutlineDesktopMac } from "react-icons/md";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import Swal from "sweetalert2";
import { useUpdateSingleUserMutation } from "../../../../redux/Api/UserManagmentApi/UserManagmentApi";
const DeviceRow = ({ index, device, userId }) => {
  const [updateUser] = useUpdateSingleUserMutation();
  const { createdAt, deviceInfo } = device;
  //
  function detectOS(userAgent) {
    if (/Windows/.test(userAgent)) {
      return (
        <span className="flex items-center gap-1">
          Windows <AiFillWindows size={20} />{" "}
        </span>
      );
    } else if (/Mac OS X/.test(userAgent)) {
      return (
        <span className="flex items-center gap-1">
          macOS <MdOutlineDesktopMac size={20} />{" "}
        </span>
      );
    } else if (/iPhone|iPad|iPod/.test(userAgent)) {
      return (
        <span className="flex items-center gap-1">
          iOS <AiFillApple size={20} />{" "}
        </span>
      );
    } else if (/Android/.test(userAgent)) {
      return (
        <span className="flex items-center gap-1">
          Android <AiFillAndroid size={20} />{" "}
        </span>
      );
    } else {
      return (
        <span className="flex items-center gap-1">
          Unknown <VscWorkspaceUnknown size={20} />{" "}
        </span>
      ); // Return "Unknown" for any other OS
    }
  }

  //
  const handleDelete = async (deviceInfo) => {
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
        const userData = {
          deviceLogin: [
            {
              deviceInfo,
              isDeleted: true,
            },
          ],
        };

        const getUser = await updateUser({ userId, userData });

        if (getUser?.data?.success) {
          toast.success(getUser.data.message);
        } else {
          toast.error("Somthing wrong in network!");
        }
      }
    });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <span title={deviceInfo}>{detectOS(deviceInfo)}</span>
      </td>
      {/* <td>{moment(createdAt).local().format("MMMM D, YYYY h:mm A Z")}</td> */}
      <td>{moment(createdAt).local().format("MMMM D, YYYY HH:mm Z")}</td>
      <td>
        {" "}
        <button
          onClick={() => handleDelete(deviceInfo)}
          className="btn btn-ghost bg-error btn-xs">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default DeviceRow;
