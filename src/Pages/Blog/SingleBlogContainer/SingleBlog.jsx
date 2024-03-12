import { Image } from "antd";
import React from "react";

const SingleBlog = ({ blogData }) => {
  const { _id, title, description, pin, createdAt, imageUrl } = blogData;
  return (
    <div className="space-y-5 p-2">
      {imageUrl && (
        <div className="flex justify-center items-center">
          <Image height={500} src={imageUrl} />
        </div>
      )}
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-xl md:mr-40">{description}</p>
    </div>
  );
};

export default SingleBlog;
