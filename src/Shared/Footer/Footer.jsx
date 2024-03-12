import React from "react";
import bg from "../../assets/Images/bg-4.jpg";
import CTA from "../Components/CTA";
import Logo from "../Components/Logo";
import Container from "../Container/Container";
import FooterCopy from "./FooterCopy";

const Footer = () => {
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="py-20 bg-cover bg-center">
      <Container>
        <div className="flex flex-col items-center text-white gap-5">
          <Logo nameColor={"text-white"} />
          <h1 className="text-3xl md:text-6xl lg:text-7xl leading-tight text-center">
            We Give Best Guidence To Each Student, That’s Why We Produce
            Confident & Safe Drivers
          </h1>
          <CTA phone={`+39 320 608 8871`} />
        </div>
        <FooterCopy />
      </Container>
    </div>
  );
};

export default Footer;
