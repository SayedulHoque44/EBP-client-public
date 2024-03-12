import React from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import usePContext from "../../../Util/Hooks/usePContext";
import {
  useDeleteQNAPdfMutation,
  useGetQNAPdfQuery,
} from "../../../redux/Api/QNAManagmentApi/QNAManagmentApi";
import AddQNAPdf from "./AddQNAPdf/AddQNAPdf";

const QNAPdf = () => {
  const { data } = useGetQNAPdfQuery(undefined);
  const [deletePdfQuery, { isLoading }] = useDeleteQNAPdfMutation();
  const { loggedUser } = usePContext();

  const handleDeleteSinglePdf = (pdfId) => {
    if (isLoading) {
      return;
    }
    Swal.fire({
      title: `Are You Sure delete this pdf!`,
      text: "After Delete You won't Revert It!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deletedPdf = await deletePdfQuery(pdfId);
        if (deletedPdf.data.sucess) {
          toast.success(deletedPdf.data.message);
        }
      }
    });
  };

  return (
    <div className="py-10">
      <h1 className="text-4xl mt-5 text-center">SCHEDE ESAME PATENTE (QNA)</h1>
      <p className="text-xl my-3 text-center">
        আমাদের স্কুল থেকে যত জন স্টুডেন্ট পাস করেছেন, তাদের পরীক্ষার প্রশ্ন এবং
        উত্তর গুলো PDF ফাইল এর মাধ্যমে দেওয়া আছে।
      </p>

      <div className="py-5 space-y-3">
        {loggedUser?.role === "Admin" && <AddQNAPdf />}
        {data?.map(({ _id, title, link }) => (
          <div
            key={_id}
            className="p-3 bg-P-Black  my-5 rounded flex justify-between">
            <a className="text-P-gry flex-1" href={link}>
              {title}
            </a>
            {loggedUser?.role === "Admin" && (
              <MdDelete
                size={25}
                onClick={() => handleDeleteSinglePdf(_id)}
                className="text-red-400 cursor-pointer"
              />
            )}
          </div>
        ))}
        {data?.length === 0 && (
          <h1 className="py-3 text-center text-red-400">Empty!</h1>
        )}
      </div>
    </div>
  );
};

export default QNAPdf;
