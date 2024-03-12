import React from "react";
import Container from "../../../Shared/Container/Container";
import useGetAllPart from "../../../Util/Hooks/useGetAllPart";

import AddVideoPart from "./AddVideoPart/AddVideoPart";
import PartCoverBox from "./PartCoverBox/PartCoverBox";

const CourseVideo = () => {
  const { videParts, refetch } = useGetAllPart();

  return (
    <div className="py-10">
      <Container>
        <h1 className="text-4xl mt-5 text-center">Course Video</h1>
        <p className="text-xl my-3 text-center">
          ভিডিও এর মাধ্যমে ছাত্রদের গুরুত্বপূর্ণ প্রত্যেক অধ্যায়/বিষয়বস্তু ভাগ
          করে ধরে ধরে সব শিখানো হবে।
        </p>
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {videParts.map((part) => (
            <PartCoverBox key={part._id} partInfo={part} />
          ))}
        </div>
        {"f" === "t" && <AddVideoPart refetch={refetch} />}
      </Container>
    </div>
  );
};

export default CourseVideo;
