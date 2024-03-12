import React from "react";
import Container from "../../../Shared/Container/Container";

const Poster = () => {
  return (
    <div className="py-10">
      <Container>
        <div>
          <img
            className="w-full lg:w-1/2 mx-auto"
            src="https://i.ibb.co/2nZjgvS/poster01.jpg"
            alt="poster"
          />
        </div>
      </Container>
    </div>
  );
};

export default Poster;
