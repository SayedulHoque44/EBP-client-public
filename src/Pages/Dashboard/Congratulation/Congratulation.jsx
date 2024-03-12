// Congratulation.js
import React from "react";
import PButton from "../../../Shared/Components/PButton";
import icon from "../../../assets/Images/rewards.png";

const Congratulation = () => {
  return (
    <div
      style={{
        backgroundImage: "url('https://i.ibb.co/fSHfcCn/cong-bg.jpg')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className={`p-100 gap-2 flex flex-col justify-center items-center my-4`}>
      <img className="h-32" src={icon} alt="" />
      <h2 className="font-semibold text-2xl">Congratulation!</h2>
      <p>You have been Passed!</p>
      <PButton text={"Give Feedback please!"}  />
    </div>
  );
};

export default Congratulation;
